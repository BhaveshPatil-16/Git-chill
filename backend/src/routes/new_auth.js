const { db, bucket } = require('../firebase');

module.exports = async function (fastify, opts) {
  
  // POST /register
  // Save basic user data
  fastify.post('/register', async (request, reply) => {
    const { name, email, role, company } = request.body;

    if (!name || !email || !role) {
      return reply.code(400).send({
        success: false,
        message: 'Name, email, and role are required'
      });
    }

    try {
      const userData = {
        name,
        email,
        role,
        company: company || null,
        verificationStatus: 'pending',
        createdAt: new Date().toISOString()
      };

      const userRef = await db.collection('users').add(userData);

      return {
        success: true,
        userId: userRef.id,
        message: 'User data stored successfully'
      };
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ success: false, message: 'Failed to register user', error: error.message });
    }
  });

  // POST /verify
  // Upload face image + documents
  // Update verificationStatus to "verified"
  fastify.post('/verify', async (request, reply) => {
    const { userId, faceImage, documents } = request.body;

    if (!userId) {
      return reply.code(400).send({ success: false, message: 'User ID is required' });
    }

    try {
      const userRef = db.collection('users').doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        return reply.code(404).send({ success: false, message: 'User not found' });
      }

      const updates = { verificationStatus: 'verified' };

      try {
        // Upload Face Image
        if (faceImage) {
          // faceImage is assumed to be a base64 string (e.g., data:image/png;base64,iVBORw0...)
          const base64Data = faceImage.replace(/^data:image\/\w+;base64,/, "");
          const buffer = Buffer.from(base64Data, 'base64');
          
          const facePath = `faces/${userId}.png`;
          const file = bucket.file(facePath);
          
          await file.save(buffer, {
            metadata: { contentType: 'image/png' }
          });

          // Make file public to get a standard URL (or generate signed URL)
          await file.makePublic();
          updates.faceImageUrl = `https://storage.googleapis.com/${bucket.name}/${facePath}`;
        }

        // Upload Documents
        if (documents && Array.isArray(documents)) {
          const documentUrls = [];
          for (let i = 0; i < documents.length; i++) {
            const docBase64 = documents[i];
            // Detect content type if possible, fallback to application/pdf
            const contentTypeMatch = docBase64.match(/^data:(.+);base64,/);
            const contentType = contentTypeMatch ? contentTypeMatch[1] : 'application/pdf';
            const ext = contentType === 'application/pdf' ? 'pdf' : (contentType.split('/')[1] || 'bin');
            
            const cleanBase64 = docBase64.replace(/^data:.*?;base64,/, "");
            const buffer = Buffer.from(cleanBase64, 'base64');
            
            const docPath = `documents/${userId}/doc_${i}.${ext}`;
            const file = bucket.file(docPath);
            
            await file.save(buffer, {
              metadata: { contentType }
            });

            await file.makePublic();
            documentUrls.push(`https://storage.googleapis.com/${bucket.name}/${docPath}`);
          }
          updates.documentUrls = documentUrls;
        }
      } catch (storageError) {
        fastify.log.error('Firebase Storage Error:', storageError);
        // We will continue and update Firestore even if Storage fails (e.g. if bucket is not created yet)
        updates.storageError = 'Failed to upload files. Have you enabled Firebase Storage in the console?';
      }

      // Update Firestore
      await userRef.update(updates);

      return {
        success: true,
        userId,
        message: 'User data stored successfully'
      };
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ success: false, message: 'Verification failed', error: error.message });
    }
  });
};
