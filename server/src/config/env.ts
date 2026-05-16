import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: process.env.PORT || 5000,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  NODE_ENV: process.env.NODE_ENV || 'development',
};

if (!config.OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY is not specified in .env file');
  process.exit(1);
}