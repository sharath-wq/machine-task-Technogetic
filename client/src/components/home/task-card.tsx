import { Card, CardContent } from '@/components/ui/card';
import EditTaskModal from '../editTask';
import DeleteTaskModal from '../deleteTask';

interface TaskCardProps {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in progress' | 'completed';
    due_date: string;
}

const statusColor = {
    pending: 'bg-orange-500',
    'in progress': 'bg-yellow-500',
    completed: 'bg-green-500',
};

const TaskCard = ({ id, title, description, due_date, status }: TaskCardProps) => {
    return (
        <Card className='bg-white shadow-md flex flex-col'>
            <CardContent className='p-4 flex-grow'>
                <h2 className='text-lg font-medium'>{title}</h2>
                <p className='mt-2 text-gray-500'>
                    {description.length > 90 ? description.substring(0, 90) + '...' : description}
                </p>
            </CardContent>
            <div className='flex items-center justify-between px-4'>
                <div className='text-sm text-gray-500'>
                    Due:{' '}
                    <span className='font-medium'>
                        {new Date(due_date).setFullYear(2023) &&
                            new Date(new Date('2024-06-04T18:30:00.000Z').setFullYear(2023)).toISOString().split('T')[0]}
                    </span>
                </div>
                <div className={`rounded-full ${statusColor[status]} px-3 py-1 text-xs font-medium text-white`}>
                    {status}
                </div>
            </div>
            <div className='p-4 flex justify-end gap-2'>
                <EditTaskModal id={id} />
                <DeleteTaskModal id={id} />
            </div>
        </Card>
    );
};

export default TaskCard;
