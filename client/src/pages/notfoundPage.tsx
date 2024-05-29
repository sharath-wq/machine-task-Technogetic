import { Link } from 'react-router-dom';

export default function NotfoundPage() {
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900'>
            <div className='text-center space-y-4'>
                <h1 className='text-6xl font-bold text-gray-900 dark:text-gray-50'>404</h1>
                <p className='text-lg text-gray-500 dark:text-gray-400'>
                    Oops, the page you're looking for couldn't be found.
                </p>
                <Link
                    className='inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
                    to='/'
                >
                    Go back to the app
                </Link>
            </div>
        </div>
    );
}
