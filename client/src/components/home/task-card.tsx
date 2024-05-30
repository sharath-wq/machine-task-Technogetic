import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DeleteIcon, Trash2Icon } from 'lucide-react';

interface TaskCardProps {
    title: string;
    description: string;
    status: 'pending' | 'in progress' | 'completed';
    dueDate: string;
}

const statusColor = {
    pending: 'bg-orange-500',
    'in progress': 'bg-yellow-500',
    completed: 'bg-green-500',
};

const TaskCard = ({ title, description, dueDate, status }: TaskCardProps) => {
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
                    Due: <span className='font-medium'>{dueDate}</span>
                </div>
                <div className={`rounded-full ${statusColor[status]} px-3 py-1 text-xs font-medium text-white`}>
                    {status}
                </div>
            </div>
            <div className='p-4 flex justify-end gap-2'>
                <Button size='sm' variant='outline'>
                    <DeleteIcon className='mr-2 h-4 w-4' />
                    Edit
                </Button>
                <Button className='text-red-500' size='sm' variant='outline'>
                    <Trash2Icon className='mr-2 h-4 w-4' />
                    Delete
                </Button>
            </div>
        </Card>
    );
};

export default TaskCard;
