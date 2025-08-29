import {config} from "dotenv";

config({path: '.env.development.local'});

export const { PORT, DB_URI, JWT_EXPIRES_IN, JWT_SECRET, ARCJET_ENV, ARCJET_KEY, QSTASH_TOKEN, QSTASH_URL, SERVER_URL, EMAIL_PASSWORD  } = process.env;