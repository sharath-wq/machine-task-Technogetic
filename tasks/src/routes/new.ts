import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@scticketscommon/common';
import { Task } from '../models/task';

const router = express.Router();

router.post(
    '/api/tasks',
    requireAuth,
    [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('description').not().isEmpty().withMessage('Description is required'),
        body('due_date').not().isEmpty().withMessage('Due Date is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { title, description, due_date } = req.body;

        const task = Task.build({
            title,
            description,
            due_date,
            userId: req.currentUser!.id,
        });

        await task.save();

        res.status(201).send(task);
    }
);

export { router as createTaskRouter };
