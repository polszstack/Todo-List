import { createRemoteJWKSet, jwtVerify } from 'jose';

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID;
const ISSUER = PROJECT_ID ? `https://securetoken.google.com/${PROJECT_ID}` : '';
const AUDIENCE = PROJECT_ID || '';
const JWKS = createRemoteJWKSet(new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'));

export async function verifyFirebaseIdToken(token: string) {
  if (!PROJECT_ID) {
    throw new Error('Firebase project id is not configured');
  }

  const { payload } = await jwtVerify(token, JWKS, {
    issuer: ISSUER,
    audience: AUDIENCE,
  });

  return payload;
}
