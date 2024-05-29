import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const currentUser = true;

    if (currentUser) {
        return <Outlet />;
    }

    return <Navigate to={'/login'} />;
};

const PublicRoutes = () => {
    const currentUser = true;

    if (currentUser) {
        return <Navigate to={'/'} />;
    }

    return <Outlet />;
};

export { ProtectedRoutes, PublicRoutes };
