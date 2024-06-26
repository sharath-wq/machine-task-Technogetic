import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Loader } from 'lucide-react';
import { setUser } from '@/redux/user-slice';
import { useAppDispatch } from '@/redux/store';

export const SignupValidation = z
    .object({
        name: z.string().min(2, { message: 'Username must be at least 2 characters.' }),
        email: z.string().email(),
        password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export default function SignupPage() {
    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
        },
    });

    async function onSubmit(values: z.infer<typeof SignupValidation>) {
        try {
            const { data } = await axios.post(`/api/users/signup`, values);
            toast({
                description: 'Account created.',
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
        <section className='flex h-screen w-full items-center justify-center bg-gray-100 px-4 dark:bg-gray-950'>
            <div className='container px-4 md:px-6'>
                <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
                    <div className='flex flex-col justify-center space-y-4'>
                        <div className='space-y-2'>
                            <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
                                Streamline Your Workflow with Our Task Management App
                            </h1>
                            <p className='max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400'>
                                Boost your productivity and stay organized with our intuitive task management tool.
                                Collaborate with your team, set deadlines, and never miss a beat.
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center space-y-4'>
                        <Card className='w-full max-w-md space-y-4'>
                            <CardHeader>
                                <CardTitle>Sign Up</CardTitle>
                                <CardDescription>Create your account to start managing your tasks.</CardDescription>
                            </CardHeader>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                                    <CardContent className='space-y-4'>
                                        <FormField
                                            control={form.control}
                                            name='name'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder='Enter your name' {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

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
                                                        <Input
                                                            type='password'
                                                            placeholder='Enter your password'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='confirmPassword'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Confirm Password</FormLabel>
                                                    <FormControl>
                                                        <Input type='password' placeholder='Confrim password' {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <Link
                                            to={'/login'}
                                            className='text-sm font-normal text-primary-500 hover:underline'
                                        >
                                            Already have an account login
                                        </Link>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className='w-full' type='submit'>
                                            {isSubmitting ? <Loader /> : 'Sign Up'}
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Form>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
