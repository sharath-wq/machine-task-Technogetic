import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            name: 'test',
            email: 'test@test.com',
            password: 'password',
        })
        .expect(201);
});

it('returns a 400 with an invlaid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            name: 'test',
            email: 'asdfkaskf',
            password: 'password',
        })
        .expect(400);
});

it('returns a 400 with an invlaid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            name: 'test',
            email: 'test@gmail.com',
            password: 'p',
        })
        .expect(400);
});

it('returns a 400 with an invlaid name', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            name: '',
            email: 'test@gmail.com',
            password: 'password',
        })
        .expect(400);
});

it('returns a 400 with missing email or password or name', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@gmail.com',
            name: 'test',
        })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'password',
            name: 'test',
        })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'password',
            email: 'test@gmail.com',
        })
        .expect(400);
});

it('disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            name: 'test',
            password: 'password',
        })
        .expect(201);
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            name: 'test',
            password: 'password',
        })
        .expect(400);
});

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            name: 'test',
            password: 'password',
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});
