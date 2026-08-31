// types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    JWT_SECRET: string;
    NEXT_PUBLIC_FIREBASE_API_KEY: string;
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
    NEXT_PUBLIC_FIREBASE_APP_ID: string;
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: string;
    FIREBASE_PROJECT_ID: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
