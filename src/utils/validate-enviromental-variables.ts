import { config } from 'dotenv';
import { bool, cleanEnv, port, str } from 'envalid';
config({ path: `.env` });

const validateEnviromentalVariables = () => {
  cleanEnv(process.env, {
    PORT: port(),
    LOG_FORMAT: str(),
    ORIGIN: str(),
    CREDENTIALS: bool(),
    DATABASE_URL: str(),
    JWT_SECRET: str(),
  });
};

export default validateEnviromentalVariables;
