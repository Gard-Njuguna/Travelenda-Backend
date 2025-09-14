const admin = require('firebase-admin');

// Check if we're in development mode without Firebase credentials
const isDevelopmentWithoutFirebase = process.env.NODE_ENV === 'development' && !process.env.FIREBASE_PROJECT_ID;

// Create a mock Firebase admin for development without credentials
if (isDevelopmentWithoutFirebase) {
  console.log('⚠️ Running in development mode without Firebase credentials');
  console.log('⚠️ Using mock Firebase admin for development');
  
  // Create a mock Firebase admin with stub methods
  const mockAdmin = {
    auth: () => ({
      verifyIdToken: async (token) => ({
        uid: 'mock-user-id',
        email: 'mock-user@example.com'
      })
    }),
    firestore: () => ({
      collection: () => ({
        doc: () => ({
          get: async () => ({
            exists: true,
            data: () => ({})
          }),
          set: async () => ({}),
          update: async () => ({}),
          delete: async () => ({})
        }),
        add: async () => ({}),
        where: () => ({
          get: async () => ({
            empty: false,
            docs: []
          })
        })
      })
    })
  };
  
  module.exports = mockAdmin;
} else {
  // Initialize Firebase Admin with environment variables
  try {
    const serviceAccount = {
      "type": "service_account",
      "project_id": process.env.FIREBASE_PROJECT_ID,
      "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
      "private_key": process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      "client_email": process.env.FIREBASE_CLIENT_EMAIL,
      "client_id": process.env.FIREBASE_CLIENT_ID,
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL
    };

    // Initialize the app only if it hasn't been initialized already
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET
      });
    }

    // Export the admin instance
    module.exports = admin;
  } catch (error) {
    console.error('Firebase initialization error:', error.message);
    console.log('⚠️ Falling back to mock Firebase admin');
    
    // Create a mock Firebase admin with stub methods as fallback
    const mockAdmin = {
      auth: () => ({
        verifyIdToken: async (token) => ({
          uid: 'mock-user-id',
          email: 'mock-user@example.com'
        })
      }),
      firestore: () => ({
        collection: () => ({
          doc: () => ({
            get: async () => ({
              exists: true,
              data: () => ({})
            }),
            set: async () => ({}),
            update: async () => ({}),
            delete: async () => ({})
          }),
          add: async () => ({}),
          where: () => ({
            get: async () => ({
              empty: false,
              docs: []
            })
          })
        })
      })
    };
    
    module.exports = mockAdmin;
  }
}