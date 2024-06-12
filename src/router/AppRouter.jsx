import { Navigate, Route, Routes } from 'react-router-dom';
import { CalendarPage } from '../calendar/';
import { AuthRouter } from '../auth/router/AuthRouter';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';
import CheckingAuth from '../ui/CheckingAuth';


const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();


    useEffect(() => {
        checkAuthToken();
    }, []);

    if( status === 'checking' ){
        return <CheckingAuth />;
    }
    
    return (       
        <Routes>
            {
                (status === 'no-authenticated')
                ? (
                    <>
                        <Route path="/auth/*" element={ <AuthRouter /> } />
                        <Route path="/*" element={ <Navigate to="/auth" />} />
                    </>
                )
                : (
                    <>
                        <Route path="/" element={ <CalendarPage /> } />
                        <Route path="/*" element={ <Navigate to="/" /> } />
                    </>
                )
            }           
        </Routes>
    )
}

export { AppRouter }
