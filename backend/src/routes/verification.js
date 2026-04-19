const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../services/userRepository');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey_for_demo';
const LIVENESS_THRESHOLD = 0.85;

function isCorporateEmailForDomain(email, domain) {
  const emailDomain = String(email).split('@')[1]?.toLowerCase();
  return emailDomain === String(domain).toLowerCase();
}

function trustSignalForIndividual(payload) {
  const flags = [];
  let risk_score = 30;
  let verification_level = 2;

  if (payload.high_profile_name) {
    flags.push('high_profile_name');
    risk_score += 35;
    verification_level = 4;
  }

  if (payload.proof_type === 'professional_link') {
    risk_score += 10;
  } else {
    verification_level = Math.max(verification_level, 3);
  }

  return {
    is_verified: false,
    verification_level,
    risk_score: Math.min(risk_score, 100),
    flags
  };
}

function trustSignalForBusiness(payload) {
  const flags = [];
  let risk_score = 25;
  let verification_level = 3;

  if (!payload.domain_verified) {
    flags.push('domain_unverified');
    risk_score += 30;
    verification_level = 4;
  }

  if (!payload.registry_verified) {
    flags.push('registry_unverified');
    risk_score += 20;
    verification_level = 4;
  }

  if (!payload.email_matches_domain) {
    flags.push('domain_email_mismatch');
    risk_score += 35;
    verification_level = 5;
  }

  return {
    is_verified: payload.domain_verified && payload.registry_verified && payload.email_matches_domain,
    verification_level,
    risk_score: Math.min(risk_score, 100),
    flags
  };
}

module.exports = async function verificationRoutes(fastify) {
  // Step 1: Basic credentials.
  fastify.post('/step1-credentials', async (request, reply) => {
    const { email, password } = request.body || {};
    if (!email || !password) {
      return reply.code(400).send({ error: 'Email and password are required' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const userId = await userRepository.createCredentialStep({ email, password_hash });
    const tempToken = jwt.sign({ userId, email, signup_step: 1 }, JWT_SECRET, { expiresIn: '1h' });

    return {
      message: 'Step 1 complete',
      userId,
      tempToken
    };
  });

  // Step 2: Active liveness gate.
  fastify.post('/step2-face-verify', async (request, reply) => {
    const { userId, faceDescriptor, livenessScore, livenessFrameUrl } = request.body || {};
    if (!userId || !Array.isArray(faceDescriptor)) {
      return reply.code(400).send({ error: 'userId and faceDescriptor are required' });
    }

    if (typeof livenessScore !== 'number' || livenessScore < LIVENESS_THRESHOLD) {
      return reply.code(400).send({
        error: 'Liveness check failed',
        required_score: LIVENESS_THRESHOLD
      });
    }

    await userRepository.updateLiveness(userId, {
      face_descriptor: faceDescriptor,
      liveness_score: livenessScore,
      liveness_frame_url: livenessFrameUrl
    });

    const tempToken = jwt.sign({ userId, signup_step: 2 }, JWT_SECRET, { expiresIn: '1h' });
    return {
      message: 'Liveness passed',
      verification_status: 'liveness_passed',
      tempToken
    };
  });

  // Step 3A: Individual claim.
  fastify.post('/step3-individual-claim', async (request, reply) => {
    const { userId, proofType, documentUrl, referenceLink, highProfileName } = request.body || {};

    if (!userId || !proofType) {
      return reply.code(400).send({ error: 'userId and proofType are required' });
    }

    const trust_signal = trustSignalForIndividual({
      high_profile_name: !!highProfileName,
      proof_type: proofType
    });

    const requiresManualReview = trust_signal.verification_level >= 4;
    await userRepository.updateIndividualClaim(userId, {
      proof_type: proofType,
      document_url: documentUrl,
      reference_link: referenceLink,
      trust_signal: {
        ...trust_signal,
        is_verified: !requiresManualReview
      },
      requires_manual_review: requiresManualReview
    });

    const verification_status = requiresManualReview ? 'under_review' : 'verified';
    const token = jwt.sign(
      {
        userId,
        role: 'individual',
        verification_status
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      message: 'Individual claim submitted',
      verification_status,
      token
    };
  });

  // Step 3B: Business owner claim.
  fastify.post('/step3-business-claim', async (request, reply) => {
    const {
      userId,
      companyName,
      companyDomain,
      businessRegistrationNumber,
      workEmail,
      domainVerified,
      domainVerificationMethod,
      domainVerificationToken,
      registryVerified
    } = request.body || {};

    if (!userId || !companyName || !companyDomain || !businessRegistrationNumber || !workEmail) {
      return reply.code(400).send({ error: 'Missing business claim fields' });
    }

    const email_matches_domain = isCorporateEmailForDomain(workEmail, companyDomain);
    const trust_signal = trustSignalForBusiness({
      domain_verified: !!domainVerified,
      registry_verified: !!registryVerified,
      email_matches_domain
    });

    await userRepository.updateBusinessClaim(userId, {
      company_name: companyName,
      company_domain: companyDomain,
      business_registration_number: businessRegistrationNumber,
      work_email: workEmail,
      domain_verified: !!domainVerified,
      domain_verification_method: domainVerificationMethod || null,
      domain_verification_token: domainVerificationToken || null,
      registry_verified: !!registryVerified,
      trust_signal
    });

    const verification_status = trust_signal.is_verified ? 'verified' : 'under_review';
    const token = jwt.sign(
      {
        userId,
        role: 'business_owner',
        verification_status
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      message: 'Business ownership claim submitted',
      verification_status,
      token
    };
  });

  // Example protected routes using RBAC verification gate.
  fastify.post(
    '/events',
    { preHandler: [fastify.authenticate, fastify.requireVerifiedIdentity] },
    async () => ({ message: 'Event created' })
  );

  fastify.post(
    '/messages',
    { preHandler: [fastify.authenticate, fastify.requireVerifiedIdentity] },
    async () => ({ message: 'Message sent' })
  );
};
