import request from 'supertest';
import { app } from '../app';

const getCookies = async () => {
    const email = 'test@test.com';
    const password = 'password';
    const name = 'test';

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email,
            password,
            name,
        })
        .expect(201);

    const cookie = response.get('Set-Cookie');

    return cookie;
};

export { getCookies };
