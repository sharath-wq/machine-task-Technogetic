import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { getCookies } from '../../utils/getCookies';

it('returns a 404 if the task is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app).get(`/api/tasks/${id}`).send().expect(404);
});

it('returns the task if the task is found', async () => {
    const title = 'test';
    const description = 'someting';
    const due_date = new Date();

    const response = await request(app)
        .post('/api/tasks')
        .set('Cookie', getCookies())
        .send({
            title,
            description,
            due_date,
        })
        .expect(201);

    const ticketResponse = await request(app).get(`/api/tasks/${response.body.id}`).send().expect(200);

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.description).toEqual(description);
});
