import mongoose from 'mongoose';

interface TaskAttrs {
    title: string;
    description: string;
    due_date: Date;
    userId: string;
}

interface TaskModel extends mongoose.Model<TaskDoc> {
    build(attrs: TaskAttrs): TaskDoc;
}

interface TaskDoc extends mongoose.Document {
    title: string;
    description: string;
    due_date: Date;
    status: 'pending' | 'in progress' | 'completed';
    userId: string;
    version: number;
}

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        due_date: {
            type: Date,
            require: true,
        },

        status: {
            type: String,
            enum: ['pending', 'in progress', 'completed'],
            default: 'pending',
        },

        userId: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            },
        },
    }
);

taskSchema.statics.build = (attrs: TaskAttrs) => {
    return new Task(attrs);
};

const Task = mongoose.model<TaskDoc, TaskModel>('Task', taskSchema);

export { Task };
