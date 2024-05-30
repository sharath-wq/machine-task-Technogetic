import express, { Request, Response } from 'express';
import { NotFoundError, requireAuth, NotAuthorizedError } from '@scticketscommon/common';
import { Task } from '../models/task';

const router = express.Router();

router.delete('/api/tasks/:id', requireAuth, async (req: Request, res: Response) => {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
        throw new NotFoundError();
    }

    if (task.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    await Task.findByIdAndDelete(id);

    res.send(task);
});

export { router as deleteTaskRouter };
