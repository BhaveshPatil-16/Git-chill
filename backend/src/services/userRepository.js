const { db } = require('../firebase');

const USERS_COLLECTION = 'users';

function nowIso() {
  return new Date().toISOString();
}

function defaultTrustSignal() {
  return {
    is_verified: false,
    verification_level: 1,
    risk_score: 50,
    flags: []
  };
}

async function createCredentialStep({ email, password_hash }) {
  const created_at = nowIso();
  const userRef = await db.collection(USERS_COLLECTION).add({
    email,
    password_hash,
    signup_step: 1,
    verification_status: 'pending',
    trust_signal: defaultTrustSignal(),
    created_at,
    updated_at: created_at
  });
  return userRef.id;
}

async function getById(uid) {
  const snapshot = await db.collection(USERS_COLLECTION).doc(uid).get();
  if (!snapshot.exists) return null;
  return { uid, ...snapshot.data() };
}

async function updateLiveness(uid, payload) {
  const updated_at = nowIso();
  await db.collection(USERS_COLLECTION).doc(uid).update({
    signup_step: 2,
    verification_status: 'liveness_passed',
    face_descriptor: payload.face_descriptor,
    liveness_score: payload.liveness_score,
    liveness_frame_url: payload.liveness_frame_url || null,
    updated_at
  });
}

async function updateIndividualClaim(uid, payload) {
  const updated_at = nowIso();
  await db.collection(USERS_COLLECTION).doc(uid).update({
    role: 'individual',
    signup_step: 3,
    verification_status: payload.requires_manual_review ? 'under_review' : 'identity_submitted',
    identity_proof: {
      type: payload.proof_type,
      document_url: payload.document_url || null,
      reference_link: payload.reference_link || null,
      submitted_at: updated_at
    },
    trust_signal: payload.trust_signal,
    updated_at
  });
}

async function updateBusinessClaim(uid, payload) {
  const updated_at = nowIso();
  await db.collection(USERS_COLLECTION).doc(uid).update({
    role: 'business_owner',
    signup_step: 3,
    verification_status: payload.domain_verified && payload.registry_verified ? 'verified' : 'under_review',
    business_proof: {
      company_name: payload.company_name,
      company_domain: payload.company_domain,
      business_registration_number: payload.business_registration_number,
      work_email: payload.work_email,
      domain_verified: payload.domain_verified,
      domain_verification_method: payload.domain_verification_method || null,
      domain_verification_token: payload.domain_verification_token || null,
      registry_verified: payload.registry_verified,
      submitted_at: updated_at
    },
    trust_signal: payload.trust_signal,
    updated_at
  });
}

module.exports = {
  createCredentialStep,
  getById,
  updateLiveness,
  updateIndividualClaim,
  updateBusinessClaim
};
