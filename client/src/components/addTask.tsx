import { Button } from '@/components/ui/button';
import { DialogTrigger, DialogTitle, DialogHeader, DialogFooter, DialogContent, Dialog } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PopoverTrigger, PopoverContent, Popover } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarDaysIcon, PlusIcon } from 'lucide-react';

export default function AddTaskModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-blue-500 hover:bg-blue-600' size='sm'>
                    <PlusIcon className='mr-2 h-4 w-4' />
                    New Task
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Add Task</DialogTitle>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <div className='grid gap-2'>
                        <Label htmlFor='title'>Title</Label>
                        <Input id='title' placeholder='Enter task title' />
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor='description'>Description</Label>
                        <Textarea id='description' placeholder='Enter task description' />
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor='dueDate'>Due Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button className='w-full justify-start text-left font-normal' variant='outline'>
                                    <CalendarDaysIcon className='mr-1 h-4 w-4 -translate-x-1' />
                                    Pick a date
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align='start' className='w-auto p-0'>
                                <Calendar initialFocus mode='single' />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant='outline'>Cancel</Button>
                    <Button className='ml-auto'>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
