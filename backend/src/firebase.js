const admin = require('firebase-admin');

let firebaseReady = false;
let db;
let bucket;

try {
  // Build service account credential from environment variables
  const privateKey = process.env.FIREBASE_SA_PRIVATE_KEY
    ? process.env.FIREBASE_SA_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined;

  const config = {
    projectId: process.env.FIREBASE_SA_PROJECT_ID,
    clientEmail: process.env.FIREBASE_SA_CLIENT_EMAIL,
    hasKey: !!privateKey
  };
  
  console.log('[Firebase Init] Checking credentials:', config);

  if (config.projectId && config.clientEmail && config.hasKey) {
    const serviceAccount = {
      type:                        process.env.FIREBASE_SA_TYPE || 'service_account',
      project_id:                  process.env.FIREBASE_SA_PROJECT_ID,
      private_key_id:              process.env.FIREBASE_SA_PRIVATE_KEY_ID,
      private_key:                 privateKey,
      client_email:                process.env.FIREBASE_SA_CLIENT_EMAIL,
      client_id:                   process.env.FIREBASE_SA_CLIENT_ID,
      auth_uri:                    process.env.FIREBASE_SA_AUTH_URI,
      token_uri:                   process.env.FIREBASE_SA_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_SA_AUTH_PROVIDER_CERT_URL,
      client_x509_cert_url:        process.env.FIREBASE_SA_CLIENT_CERT_URL,
      universe_domain:             process.env.FIREBASE_SA_UNIVERSE_DOMAIN || 'googleapis.com',
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || `${serviceAccount.project_id}.appspot.com`,
    });

    db = admin.firestore();
    bucket = admin.storage().bucket();
    firebaseReady = true;
    console.log('✅ Firebase Admin SDK initialized successfully with Storage support.');
  } else {

    console.warn('⚠️ Firebase service account env vars missing. Required: PROJECT_ID, CLIENT_EMAIL, PRIVATE_KEY.');
    if (!config.projectId) console.warn('Missing: FIREBASE_SA_PROJECT_ID');
    if (!config.clientEmail) console.warn('Missing: FIREBASE_SA_CLIENT_EMAIL');
    if (!config.hasKey) console.warn('Missing: FIREBASE_SA_PRIVATE_KEY');
  }

} catch (error) {
  console.error('Firebase Admin init error:', error);
}


// Provide mocked objects to avoid crashing when testing without credentials
if (!firebaseReady) {
  const mockStore = new Map();
  db = {
    collection: (col) => ({
      doc: (id) => ({
        set: async (data) => {
          mockStore.set(`${col}/${id}`, data);
          console.log(`[Mock DB] Set ${col}/${id}:`, data);
        },
        get: async () => {
          const key = `${col}/${id}`;
          const data = mockStore.get(key);
          return { exists: !!data, id, data: () => data };
        },
        update: async (data) => {
          const key = `${col}/${id}`;
          const prev = mockStore.get(key) || {};
          const next = { ...prev, ...data };
          mockStore.set(key, next);
          console.log(`[Mock DB] Update ${col}/${id}:`, data);
        }
      }),
      add: async (data) => {
        const id = `mock-id-${Date.now()}`;
        mockStore.set(`${col}/${id}`, data);
        console.log(`[Mock DB] Add to ${col}:`, data);
        return { id };
      }
    })
  };
  
  bucket = {
    file: (filePath) => ({
      save: async (buffer) => console.log(`[Mock Storage] Saved file to ${filePath}`),
      getSignedUrl: async () => [`https://mock-storage.local/${filePath}`]
    })
  };
}

module.exports = { admin, db, bucket, firebaseReady };
