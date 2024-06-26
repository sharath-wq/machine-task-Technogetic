import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/redux/store';

const ProtectedRoutes = () => {
    const currentUser = useAppSelector((state) => state.user);

    if (currentUser.id) {
        return <Outlet />;
    }

    return <Navigate to={'/login'} />;
};

const PublicRoutes = () => {
    const currentUser = useAppSelector((state) => state.user);

    if (currentUser.id) {
        return <Navigate to={'/'} />;
    }

    return <Outlet />;
};

export { ProtectedRoutes, PublicRoutes };
