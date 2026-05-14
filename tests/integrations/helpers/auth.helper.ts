import request from 'supertest';
const NAME = `NAME_TESTING`;
const LOGIN = `LOGIN_TESTING_${Date.now()}`;
const PASSWORD = `PASSWORD_TESTING_${Date.now()}`;
import { app } from '../../../src/app';

const registerUser = async () => {
  await request(app).post('/v1/auth/signup').send({
    name: NAME,
    login: LOGIN,
    password: PASSWORD
  });
};

const getToken = async () => {
  const response = await request(app).post('/v1/auth/signin').send({
    login: LOGIN,
    password: PASSWORD
  });

  return { token: response.body.token, user: response.body.user };
};

export { registerUser, getToken };
