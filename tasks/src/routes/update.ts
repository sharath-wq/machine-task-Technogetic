import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, NotFoundError, requireAuth, NotAuthorizedError } from '@scticketscommon/common';
import { Task } from '../models/task';

const router = express.Router();

router.put(
    '/api/tasks/:id',
    requireAuth,
    [
        body('title').not().isEmpty().withMessage('Title is required').isString().withMessage('Title must be a string'),
        body('description')
            .not()
            .isEmpty()
            .withMessage('Description is required')
            .isString()
            .withMessage('Description must be a string'),
        body('due_date')
            .not()
            .isEmpty()
            .withMessage('Due Date is required')
            .isISO8601()
            .withMessage('Due Date must be a valid date'),
        body('status')
            .not()
            .isEmpty()
            .withMessage('Status is required')
            .isString()
            .withMessage('Status must be a string')
            .isIn(['pending', 'completed', 'in progress'])
            .withMessage('Status must be either pending or completed'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, description, due_date, status } = req.body;

        const task = await Task.findById(id);

        if (!task) {
            throw new NotFoundError();
        }

        if (task.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        task.set({
            title,
            description,
            due_date,
            status,
        });

        await task.save();

        res.send(task);
    }
);

export { router as updateTaskRouter };
