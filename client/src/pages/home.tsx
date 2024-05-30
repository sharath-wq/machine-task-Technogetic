import AddTaskModal from '@/components/addTask';

import TaskCard from '@/components/home/task-card';
import User from '@/components/user-icon';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setTasks } from '@/redux/task-slice';
import { toast } from '@/components/ui/use-toast';
import { useEffect } from 'react';

export default function HomePage() {
    const dispatch = useAppDispatch();

    const tasks = useAppSelector((state) => state.tasks.tasks);

    const fetchTasks = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.get(`/api/tasks`);

            dispatch(setTasks(data));
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.' + error,
            });
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <>
            <header className='flex items-center justify-between bg-gray-900 px-6 py-4 text-white'>
                <h1 className='text-2xl font-bold'>Task Manager</h1>
                <div className='flex gap-2'>
                    <AddTaskModal />
                    <User />
                </div>
            </header>
            {tasks.length ? (
                <main className='container mx-auto my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {tasks.map((task: any) => (
                        <TaskCard
                            id={task.id}
                            key={task.id}
                            title={task.title}
                            description={task.description}
                            due_date={task.due_date}
                            status={task.status}
                        />
                    ))}
                </main>
            ) : (
                <main className='flex flex-col items-center justify-center h-[800px] gap-4'>
                    <h2 className='text-2xl font-bold'>No Tasks Available</h2>
                    <p className='text-gray-500 dark:text-gray-400'>There are currently no tasks to display.</p>
                </main>
            )}
        </>
    );
}
