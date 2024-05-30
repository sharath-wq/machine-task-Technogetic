import { Button } from '@/components/ui/button';
import { DialogTrigger, DialogTitle, DialogHeader, DialogContent, Dialog, DialogClose } from '@/components/ui/dialog';
import { Trash2Icon } from 'lucide-react';

export default function DeleteTaskModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='text-red-500' size='sm' variant='outline'>
                    <Trash2Icon className='mr-2 h-4 w-4' />
                    Delete
                </Button>
            </DialogTrigger>

            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Delete Task</DialogTitle>
                </DialogHeader>
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
                    <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900'>
                        <div className='space-y-4'>
                            <div className='space-y-2'>
                                <h3 className='text-xl font-medium'>Delete Task</h3>
                                <p className='text-gray-500 dark:text-gray-400'>
                                    Are you sure you want to delete this task? This action cannot be undone.
                                </p>
                            </div>
                            <div className='flex justify-end gap-2'>
                                <DialogClose asChild>
                                    <Button type='button' variant='outline'>
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type='submit' variant='destructive'>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
