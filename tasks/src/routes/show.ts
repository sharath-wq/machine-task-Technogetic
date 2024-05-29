import express, { Request, Response } from 'express';
import { Task } from '../models/task';
import { NotFoundError } from '@scticketscommon/common';

const router = express.Router();

router.get('/api/tasks/:id', async (req: Request, res: Response) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        throw new NotFoundError();
    }

    res.send(task);
});

export { router as showTaskRouter };
