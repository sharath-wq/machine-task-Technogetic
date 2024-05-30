import request from 'supertest';
import { app } from '../../app';
import { getCookies } from '../../utils/getCookies';

const createTask = (cookie: any) => {
    return request(app).post('/api/tasks').set('Cookie', cookie).send({
        title: 'title',
        description: 'description',
        due_date: new Date(),
    });
};

it('can fetcha list of tickets', async () => {
    const cookie = getCookies();

    await createTask(cookie);
    await createTask(cookie);
    await createTask(cookie);

    const response = await request(app).get('/api/tasks').set('Cookie', cookie).send().expect(200);

    expect(response.body.length).toEqual(3);
});
