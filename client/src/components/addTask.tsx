import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { format } from 'date-fns';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
    DialogTrigger,
    DialogTitle,
    DialogHeader,
    DialogFooter,
    DialogContent,
    Dialog,
    DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, PlusIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from './ui/calendar';
import axios from 'axios';
import { toast } from './ui/use-toast';
import { useAppDispatch } from '@/redux/store';
import { addTask } from '@/redux/task-slice';

export const AddTaskValidation = z.object({
    title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
    description: z
        .string()
        .min(10, {
            message: 'Description must be at least 10 characters.',
        })
        .max(160, {
            message: 'Description must not be longer than 30 characters.',
        }),
    due_date: z.date({
        required_error: 'A due date is requried',
    }),
});

export default function AddTaskModal() {
    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof AddTaskValidation>>({
        resolver: zodResolver(AddTaskValidation),
        defaultValues: {
            title: '',
            description: '',
            due_date: new Date(),
        },
    });

    async function onSubmit(values: z.infer<typeof AddTaskValidation>) {
        try {
            const { data } = await axios.post(`/api/tasks`, values);
            toast({
                description: 'New task added.',
            });
            dispatch(addTask(data));
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.' + error,
            });
        } finally {
            form.setValue('description', '');
            form.setValue('title', '');
        }
    }

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

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter task title' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder='Enter your description' className='resize-none' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='due_date'
                            render={({ field }) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel>Due Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={'outline'}
                                                    className={cn(
                                                        'w-[240px] pl-3 text-left font-normal',
                                                        !field.value && 'text-muted-foreground'
                                                    )}
                                                >
                                                    {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className='w-auto p-0' align='start'>
                                            <Calendar
                                                mode='single'
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) => new Date(date) < new Date()}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant='outline'>Cancel</Button>
                            </DialogClose>

                            <DialogClose asChild>
                                <Button type='submit' className='ml-auto'>
                                    Save
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
