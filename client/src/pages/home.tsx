import AddTaskModal from '@/components/addTask';
import { Button } from '@/components/ui/button';
import { CardContent, Card } from '@/components/ui/card';
import { DeleteIcon, Trash2Icon } from 'lucide-react';

export default function HomePage() {
    return (
        <>
            <header className='flex items-center justify-between bg-gray-900 px-6 py-4 text-white'>
                <h1 className='text-2xl font-bold'>Task Manager</h1>
                <AddTaskModal />
            </header>
            <main className='container mx-auto my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                <Card className='bg-white shadow-md'>
                    <CardContent className='p-4'>
                        <h2 className='text-lg font-medium'>Finish Quarterly Report</h2>
                        <p className='mt-2 text-gray-500'>
                            Compile data and write up the quarterly report for the leadership team.
                        </p>
                        <div className='mt-4 flex items-center justify-between'>
                            <div className='text-sm text-gray-500'>
                                Due:
                                <span className='font-medium'>2023-06-30</span>
                            </div>
                            <div className='rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white'>
                                In Progress
                            </div>
                        </div>
                        <div className='mt-4 flex justify-end gap-2'>
                            <Button size='sm' variant='outline'>
                                <DeleteIcon className='mr-2 h-4 w-4' />
                                Edit
                            </Button>
                            <Button className='text-red-500' size='sm' variant='outline'>
                                <Trash2Icon className='mr-2 h-4 w-4' />
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card className='bg-white shadow-md'>
                    <CardContent className='p-4'>
                        <h2 className='text-lg font-medium'>Redesign Website</h2>
                        <p className='mt-2 text-gray-500'>
                            Update the company website with a modern and responsive design.
                        </p>
                        <div className='mt-4 flex items-center justify-between'>
                            <div className='text-sm text-gray-500'>
                                Due:
                                <span className='font-medium'>2023-07-15</span>
                            </div>
                            <div className='rounded-full bg-yellow-500 px-3 py-1 text-xs font-medium text-white'>
                                Pending
                            </div>
                        </div>
                        <div className='mt-4 flex justify-end gap-2'>
                            <Button size='sm' variant='outline'>
                                <DeleteIcon className='mr-2 h-4 w-4' />
                                Edit
                            </Button>
                            <Button className='text-red-500' size='sm' variant='outline'>
                                <Trash2Icon className='mr-2 h-4 w-4' />
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card className='bg-white shadow-md'>
                    <CardContent className='p-4'>
                        <h2 className='text-lg font-medium'>Prepare for Client Meeting</h2>
                        <p className='mt-2 text-gray-500'>
                            Gather materials and prepare a presentation for the client meeting next week.
                        </p>
                        <div className='mt-4 flex items-center justify-between'>
                            <div className='text-sm text-gray-500'>
                                Due:
                                <span className='font-medium'>2023-06-20</span>
                            </div>
                            <div className='rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white'>
                                In Progress
                            </div>
                        </div>
                        <div className='mt-4 flex justify-end gap-2'>
                            <Button size='sm' variant='outline'>
                                <DeleteIcon className='mr-2 h-4 w-4' />
                                Edit
                            </Button>
                            <Button className='text-red-500' size='sm' variant='outline'>
                                <Trash2Icon className='mr-2 h-4 w-4' />
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card className='bg-white shadow-md'>
                    <CardContent className='p-4'>
                        <h2 className='text-lg font-medium'>Implement New Feature</h2>
                        <p className='mt-2 text-gray-500'>
                            Develop and test a new feature for the product based on user feedback.
                        </p>
                        <div className='mt-4 flex items-center justify-between'>
                            <div className='text-sm text-gray-500'>
                                Due:
                                <span className='font-medium'>2023-08-01</span>
                            </div>
                            <div className='rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white'>To Do</div>
                        </div>
                        <div className='mt-4 flex justify-end gap-2'>
                            <Button size='sm' variant='outline'>
                                <DeleteIcon className='mr-2 h-4 w-4' />
                                Edit
                            </Button>
                            <Button className='text-red-500' size='sm' variant='outline'>
                                <Trash2Icon className='mr-2 h-4 w-4' />
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card className='bg-white shadow-md'>
                    <CardContent className='p-4'>
                        <h2 className='text-lg font-medium'>Onboard New Hire</h2>
                        <p className='mt-2 text-gray-500'>
                            Coordinate with HR to onboard the new hire and get them set up with the necessary tools and
                            access.
                        </p>
                        <div className='mt-4 flex items-center justify-between'>
                            <div className='text-sm text-gray-500'>
                                Due:
                                <span className='font-medium'>2023-06-25</span>
                            </div>
                            <div className='rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white'>
                                In Progress
                            </div>
                        </div>
                        <div className='mt-4 flex justify-end gap-2'>
                            <Button size='sm' variant='outline'>
                                <DeleteIcon className='mr-2 h-4 w-4' />
                                Edit
                            </Button>
                            <Button className='text-red-500' size='sm' variant='outline'>
                                <Trash2Icon className='mr-2 h-4 w-4' />
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card className='bg-white shadow-md'>
                    <CardContent className='p-4'>
                        <h2 className='text-lg font-medium'>Conduct User Research</h2>
                        <p className='mt-2 text-gray-500'>
                            Plan and execute a user research study to gather feedback on the product.
                        </p>
                        <div className='mt-4 flex items-center justify-between'>
                            <div className='text-sm text-gray-500'>
                                Due:
                                <span className='font-medium'>2023-07-31</span>
                            </div>
                            <div className='rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white'>To Do</div>
                        </div>
                        <div className='mt-4 flex justify-end gap-2'>
                            <Button size='sm' variant='outline'>
                                <DeleteIcon className='mr-2 h-4 w-4' />
                                Edit
                            </Button>
                            <Button className='text-red-500' size='sm' variant='outline'>
                                <Trash2Icon className='mr-2 h-4 w-4' />
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </>
    );
}
