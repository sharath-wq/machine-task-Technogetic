import { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { TriangleAlertIcon } from 'lucide-react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className='flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900'>
                    <div className='max-w-md p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800'>
                        <div className='flex flex-col items-center'>
                            <TriangleAlertIcon className='w-16 h-16 text-red-500' />
                            <h1 className='mt-4 text-4xl font-bold text-gray-800 dark:text-gray-100'>
                                Oops! Something went wrong.
                            </h1>
                            <p className='mt-2 text-gray-600 dark:text-gray-400'>
                                We apologize for the inconvenience. Please try again later.
                            </p>
                            <Link
                                className='mt-6 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-400'
                                to='/'
                            >
                                Go back to the app
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
