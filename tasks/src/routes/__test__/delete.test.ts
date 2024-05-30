import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { getCookies } from '../../utils/getCookies';
import { Task } from '../../models/task';

it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app).delete(`/api/tasks/${id}`).set('Cookie', getCookies()).send().expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app).delete(`/api/tasks/${id}`).send().expect(401);
});

it('returns a 401 if the user does not own the task', async () => {
    const task = Task.build({
        title: 'title',
        description: 'description',
        due_date: new Date(),
        userId: new mongoose.Types.ObjectId().toHexString(),
    });
    await task.save();

    await request(app).delete(`/api/tasks/${task.id}`).set('Cookie', getCookies()).send().expect(401);
});

it('deletes the task if the user owns the task', async () => {
    const cookie = getCookies();

    const title = 'hkldakas';
    const description = 'something';
    const due_date = new Date();

    const resposne = await request(app)
        .post('/api/tasks')
        .set('Cookie', cookie)
        .send({
            title,
            description,
            due_date,
        })
        .expect(201);

    await request(app).delete(`/api/tasks/${resposne.body.id}`).set('Cookie', cookie).send().expect(200);

    const deletedTask = await Task.findById(resposne.body.id);
    expect(deletedTask).toBeNull();
});
