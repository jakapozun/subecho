import {config} from "dotenv";

config({path: '.env.development.local'});

export const { PORT, DB_URI, JWT_EXPIRES_IN, JWT_SECRET, ARCJET_ENV, ARCJET_KEY } = process.env;