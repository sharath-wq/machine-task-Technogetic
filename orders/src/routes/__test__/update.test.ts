import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { getCookies } from '../../utils/getCookies';
import { Task } from '../../models/task';

it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/tasks/${id}`)
        .set('Cookie', getCookies())
        .send({
            title: 'title',
            description: 'description',
            status: 'in progress',
            due_date: new Date(),
        })
        .expect(404);
});

it('retunes a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tasks/${id}`)
        .send({
            title: 'title',
            description: 'description',
            status: 'in progress',
            due_date: new Date(),
        })
        .expect(401);
});

it('retunes a 401 if the user is not own the task', async () => {
    const response = await request(app).post('/api/tasks').set('Cookie', getCookies()).send({
        title: 'title',
        description: 'description',
        status: 'in progress',
        due_date: new Date(),
    });

    await request(app)
        .put(`/api/tasks/${response.body.id}`)
        .set('Cookie', getCookies())
        .send({
            title: 'new title',
            description: 'new description',
            status: 'completed',
            due_date: new Date(),
        })
        .expect(401);
});

it('retunes a 400 if the user provides an invalid title or description or due_date or status', async () => {
    const cookie = getCookies();
    const response = await request(app).post('/api/tasks').set('Cookie', cookie).send({
        title: 'title',
        description: 'description',
        status: 'in progress',
        due_date: new Date(),
    });

    await request(app)
        .put(`/api/tasks/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            description: 'description',
            status: 'in progress',
            due_date: new Date(),
        })
        .expect(400);

    await request(app)
        .put(`/api/tasks/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'title',
            description: '',
            status: 'in progress',
            due_date: new Date(),
        })
        .expect(400);

    await request(app)
        .put(`/api/tasks/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'title',
            description: 'description',
            status: '',
            due_date: new Date(),
        })
        .expect(400);

    await request(app)
        .put(`/api/tasks/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'title',
            description: 'description',
            status: 'in progress',
            due_date: '',
        })
        .expect(400);
});

it('updates the task provided valid inputs', async () => {
    const cookie = getCookies();

    const createResponse = await request(app).post('/api/tasks').set('Cookie', cookie).send({
        title: 'title',
        description: 'description',
        status: 'in progress',
        due_date: new Date(),
    });

    expect(createResponse.status).toEqual(201);
    const taskId = createResponse.body.id;

    const updateResponse = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set('Cookie', cookie)
        .send({
            title: 'new Title',
            description: 'new description',
            status: 'completed',
            due_date: new Date('2024-06-1'),
        });

    expect(updateResponse.status).toEqual(200);

    const taskResponse = await request(app).get(`/api/tasks/${taskId}`).send();

    expect(taskResponse.body.title).toEqual('new Title');
    expect(taskResponse.body.description).toEqual('new description');
    expect(taskResponse.body.status).toEqual('completed');
    expect(new Date(taskResponse.body.due_date)).toEqual(new Date('2024-06-1'));
});
