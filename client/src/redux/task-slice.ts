import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Task {
    id: string;
    title: string;
    description: string;
    due_date: Date;
    status: string;
}

export interface TasksState {
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: [],
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        },
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        removeTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        updateTask: (state, action: PayloadAction<{ id: string; updatedTask: Partial<Task> }>) => {
            const { id, updatedTask } = action.payload;
            const taskIndex = state.tasks.findIndex((task) => task.id === id);
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updatedTask };
            }
        },
    },
});

export const { setTasks, addTask, removeTask, updateTask } = tasksSlice.actions;

export default tasksSlice.reducer;
