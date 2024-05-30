import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import {
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenu,
} from '@/components/ui/dropdown-menu';
import { LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { toast } from './ui/use-toast';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { clearUser } from '@/redux/user-slice';

export default function User() {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((state) => state.user);

    async function onLogout() {
        try {
            await axios.post(`/api/users/signout`);
            toast({
                description: 'Logged Out.',
            });

            dispatch(clearUser());
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.' + error,
            });
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className='h-10 w-10 cursor-pointer'>
                    <AvatarImage alt='@shadcn' src='#' />
                    <AvatarFallback className='text-black'>{currentUser?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <UserIcon className='mr-2 h-4 w-4' />
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <SettingsIcon className='mr-2 h-4 w-4' />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className='text-red-600'>
                    <LogOutIcon className='mr-2 h-4 w-4' />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
