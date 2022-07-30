import dotenv from 'dotenv';
import parseArgs from 'minimist';
import { ExtractJwt as ExtractJWT } from 'passport-jwt';

const options = { alias: { p: "port", m: "modo" } };
const puerto = parseArgs(process.argv, options).port;
const modo = parseArgs(process.argv, options).modo;

dotenv.config();

export const jwtOpts = {
  secretOrKey: process.env.SECRET || 'TOP_SECRET',
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: process.env.JWT_IGNORE_EXPIRE || false,
  expireIn: parseInt(process.env.JWT_TIME_EXPIRE) || 3600,
}

export const ServidorEnvioEmail = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'halie.morar@ethereal.email',
    pass: '9b1ugWuz1sw71arkXB'
  }
}

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: puerto || process.env.PORT,
  MODO: modo,
  MONGO_URL: process.env.MONGO_URL || 'noURL',
  MONGO_DB: process.env.MONGO_BASE || 'clase36'
}
