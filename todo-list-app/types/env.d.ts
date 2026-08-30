// types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    JWT_SECRET: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}