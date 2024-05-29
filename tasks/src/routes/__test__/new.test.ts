import request from 'supertest';
import { app } from '../../app';
import { getCookies } from '../../utils/getCookies';
import { Task } from '../../models/task';
import { cookie } from 'express-validator';

it('has a route handler listening to /api/tasks for post requests', async () => {
    const response = await request(app).post('/api/tasks').send({});
    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
    await request(app).post('/api/tasks').send({}).expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
    const response = await request(app).post('/api/tasks').set('Cookie', getCookies()).send({});

    expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
    const cookie = await getCookies();

    await request(app)
        .post('/api/tasks')
        .set('Cookie', cookie)
        .send({
            title: '',
            description: 'something',
            due_date: new Date(),
        })
        .expect(400);

    await request(app)
        .post('/api/tasks')
        .set('Cookie', cookie)
        .send({
            description: 'something',
            due_date: new Date(),
        })
        .expect(400);
});

it('returns an error if an invalid description is provided', async () => {
    const cookie = await getCookies();

    await request(app)
        .post('/api/tasks')
        .set('Cookie', cookie)
        .send({
            title: 'title',
            description: '',
            due_date: new Date(),
        })
        .expect(400);

    await request(app)
        .post('/api/tasks')
        .set('Cookie', cookie)
        .send({
            title: 'title',
            due_date: new Date(),
        })
        .expect(400);
});

it('returns an error if an invalid date is provided', async () => {
    const cookie = await getCookies();

    await request(app)
        .post('/api/tasks')
        .set('Cookie', cookie)
        .send({
            title: 'title',
            description: 'something',
            due_date: '',
        })
        .expect(400);

    await request(app)
        .post('/api/tasks')
        .set('Cookie', cookie)
        .send({
            title: 'title',
            description: 'something',
        })
        .expect(400);
});

it('creates a task with valid inputs', async () => {
    const cookie = await getCookies();
    let tasks = await Task.find({});
    expect(tasks.length).toEqual(0);

    const title = 'hkldakas';
    const description = 'something';
    const due_date = new Date();

    const res = await request(app)
        .post('/api/tasks')
        .set('Cookie', cookie)
        .send({
            title,
            description,
            due_date,
        })
        .expect(201);

    tasks = await Task.find({});

    expect(tasks.length).toEqual(1);
    expect(tasks[0].title).toEqual(title);
    expect(tasks[0].description).toEqual(description);
    expect(tasks[0].due_date).toEqual(due_date);
});
