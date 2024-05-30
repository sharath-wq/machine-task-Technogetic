import AddTaskModal from '@/components/addTask';

import { tasks } from '@/constants';
import TaskCard from '@/components/home/task-card';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setUser } from '@/redux/user-slice';

export default function HomePage() {
    // const user = useAppSelector((state) => state.user);

    // console.log(user);

    // const usera = {
    //     id: '123',
    //     email: 'skdf',
    //     name: 'dfkajs',
    // };

    // const dispatch = useAppDispatch();

    // dispatch(setUser(usera));

    return (
        <>
            <header className='flex items-center justify-between bg-gray-900 px-6 py-4 text-white'>
                <h1 className='text-2xl font-bold'>Task Manager</h1>
                <AddTaskModal />
            </header>
            {tasks.length ? (
                <main className='container mx-auto my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {tasks.map((task: any, index: number) => (
                        <TaskCard
                            key={index}
                            title={task.title}
                            description={task.description}
                            dueDate={task.dueDate}
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
