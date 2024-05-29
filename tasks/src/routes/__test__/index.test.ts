import request from 'supertest';
import { app } from '../../app';
import { getCookies } from '../../utils/getCookies';

const createTask = () => {
    return request(app).post('/api/tasks').set('Cookie', getCookies()).send({
        title: 'title',
        description: 'description',
        due_date: new Date(),
    });
};

it('can fetcha list of tickets', async () => {
    await createTask();
    await createTask();
    await createTask();

    const response = await request(app).get('/api/tasks').send().expect(200);

    expect(response.body.length).toEqual(3);
});
