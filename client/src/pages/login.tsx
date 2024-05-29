import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function LoginPage() {
    return (
        <div className='flex h-screen w-full items-center justify-center bg-gray-100 px-4 dark:bg-gray-950'>
            <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900'>
                <div className='space-y-4'>
                    <div className='text-center'>
                        <h1 className='text-3xl font-bold'>Welcome back!</h1>
                        <p className='text-gray-500 dark:text-gray-400'>Sign in to your account to manage your tasks.</p>
                    </div>
                    <form className='space-y-4'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='Email'>Email</Label>
                            <Input id='Email' placeholder='Enter your email' required type='text' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center justify-between'>
                                <Label htmlFor='password'>Password</Label>
                            </div>
                            <Input id='password' placeholder='Enter your password' required type='password' />
                        </div>
                        <Button className='w-full' type='submit'>
                            Sign in
                        </Button>
                        <Link to={'/signup'} className='text-sm font-normal text-primary-500 hover:underline'>
                            Don't have an account signup
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
