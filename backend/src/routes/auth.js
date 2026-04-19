const { db } = require('../firebase');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey_for_demo';

module.exports = async function (fastify, opts) {
  
  // STEP 1: Basic Credentials
  fastify.post('/step1-credentials', async (request, reply) => {
    const { email, password } = request.body;
    
    if (!email || !password) {
      return reply.code(400).send({ error: 'Email and password required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a temporary user in the database
    // For real usage, check if email exists first
    const userRef = await db.collection('users').add({
      email,
      password: hashedPassword,
      verification_status: 'unverified',
      role: null,
      createdAt: new Date().toISOString()
    });

    const tempToken = jwt.sign({ userId: userRef.id, email }, JWT_SECRET, { expiresIn: '1h' });

    return { 
      message: 'Step 1 complete', 
      tempToken, 
      userId: userRef.id 
    };
  });

  // STEP 2: Face Verification (Active Liveness)
  fastify.post('/step2-face-verify', async (request, reply) => {
    const { userId, faceDescriptor, livenessScore } = request.body;
    
    if (!userId || !faceDescriptor) {
      return reply.code(400).send({ error: 'Missing face descriptor or user ID' });
    }

    if (livenessScore < 0.7) {
      return reply.code(400).send({ error: 'Liveness check failed. Please try again.' });
    }

    // In a real system, you would check the faceDescriptor against the database 
    // to prevent duplicate identities using vector similarity search.
    
    // Update user status
    await db.collection('users').doc(userId).update({
      face_descriptor: faceDescriptor,
      verification_status: 'face_verified'
    });

    return { message: 'Face verification successful', verification_status: 'face_verified' };
  });

  // STEP 3: Role Selection & Claim
  fastify.post('/step3-role-claim', async (request, reply) => {
    const { userId, role, proofData } = request.body;

    if (!userId || !role) {
      return reply.code(400).send({ error: 'Missing user ID or role' });
    }

    let updates = { role };

    if (role === 'individual') {
      updates.identity_proof_link = proofData.identity_proof_link;
      updates.verification_status = 'pending_manual_review'; // e.g. for high profile
      // In this demo, we'll auto-verify for simplicity
      updates.verification_status = 'verified'; 
    } else if (role === 'business_owner') {
      updates.company_domain = proofData.company_domain;
      updates.business_registration_number = proofData.business_registration_number;
      // Depending on domain verification, we might mark as pending or verified
      updates.verification_status = 'verified';
    }

    await db.collection('users').doc(userId).update(updates);

    // Issue the final auth token
    const finalToken = jwt.sign({ userId, role, status: updates.verification_status }, JWT_SECRET, { expiresIn: '7d' });

    return { 
      message: 'Signup complete!', 
      token: finalToken,
      user: updates
    };
  });
};
