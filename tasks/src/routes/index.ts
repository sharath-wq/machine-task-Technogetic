import express, { Request, Response } from 'express';
import { Task } from '../models/task';
import { requireAuth } from '@scticketscommon/common';

const router = express.Router();

router.get('/api/tasks', requireAuth, async (req: Request, res: Response) => {
    const tasks = await Task.find({ userId: req.currentUser?.id! });

    res.send(tasks);
});

export { router as indexTasksRouter };
