import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function SignupPage() {
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
                        <div className='flex items-center space-x-4'>
                            <Link
                                className='inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
                                to='#'
                            >
                                Learn More
                            </Link>
                            <Link
                                className='inline-flex h-10 items-center justify-center rounded-md border  border-gray-200 bg-white px-6 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50  dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300'
                                to='/login'
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center space-y-4'>
                        <Card className='w-full max-w-md space-y-4'>
                            <CardHeader>
                                <CardTitle>Sign Up</CardTitle>
                                <CardDescription>Create your account to start managing your tasks.</CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <div className='space-y-2'>
                                    <Label htmlFor='name'>Name</Label>
                                    <Input id='name' placeholder='Enter your name' />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='email'>Email</Label>
                                    <Input id='email' placeholder='Enter your email' type='email' />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='password'>Password</Label>
                                    <Input id='password' placeholder='Enter your password' type='password' />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className='w-full' type='submit'>
                                    Sign Up
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
