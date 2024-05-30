import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import { useAppDispatch } from '@/redux/store';
import { setUser } from '@/redux/user-slice';
import { Loader } from 'lucide-react';

export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
});

export default function LoginPage() {
    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof SigninValidation>>({
        resolver: zodResolver(SigninValidation),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function onSubmit(values: z.infer<typeof SigninValidation>) {
        try {
            const { data } = await axios.post(`/api/users/signin`, values);
            toast({
                description: 'Logged In.',
            });

            dispatch(setUser(data));
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.' + error,
            });
        }
    }

    const { isSubmitting } = form.formState;

    return (
        <div className='flex h-screen w-full items-center justify-center bg-gray-100 px-4 dark:bg-gray-950'>
            <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900'>
                <div className='space-y-4'>
                    <div className='text-center'>
                        <h1 className='text-3xl font-bold'>Welcome back!</h1>
                        <p className='text-gray-500 dark:text-gray-400'>Sign in to your account to manage your tasks.</p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Enter your email' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type='password' placeholder='Enter your password' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className='w-full' type='submit'>
                                {isSubmitting ? <Loader /> : ' Sign in'}
                            </Button>
                            <Link to={'/signup'} className='text-sm font-normal text-primary-500 hover:underline'>
                                Don't have an account signup
                            </Link>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
