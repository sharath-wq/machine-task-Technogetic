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
import { CalendarIcon, DeleteIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from './ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import { toast } from './ui/use-toast';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { updateTask } from '@/redux/task-slice';

export const EditTaskValidation = z.object({
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
    status: z.string({
        required_error: 'Please select a status.',
    }),
});

export default function EditTaskModal({ id }: { id: string }) {
    const dispatch = useAppDispatch();
    const task = useAppSelector((state) => state.tasks.tasks).find((task) => task.id === id);

    const form = useForm<z.infer<typeof EditTaskValidation>>({
        resolver: zodResolver(EditTaskValidation),
        defaultValues: {
            title: task?.title,
            description: task?.description,
            due_date: task?.due_date,
            status: task?.status,
        },
    });

    async function onSubmit(values: z.infer<typeof EditTaskValidation>) {
        try {
            const { data } = await axios.put(`/api/tasks/${id}`, values);
            toast({
                description: 'Task updated.',
            });
            dispatch(updateTask({ id, updatedTask: data }));
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.' + error,
            });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size='sm' variant='outline'>
                    <DeleteIcon className='mr-2 h-4 w-4' />
                    Edit
                </Button>
            </DialogTrigger>

            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
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

                        <FormField
                            control={form.control}
                            name='status'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select a verified email to display' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value='pending'>Pending</SelectItem>
                                            <SelectItem value='in progress'>In Progress</SelectItem>
                                            <SelectItem value='completed'>Completed</SelectItem>
                                        </SelectContent>
                                    </Select>
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
