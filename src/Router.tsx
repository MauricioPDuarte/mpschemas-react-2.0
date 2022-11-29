import { Routes, Route, RouteProps } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Home } from './pages/home/Home';
import { SignIn } from './pages/signin/SignIn';
import { ProtectedRoute } from './layouts/ProtectedLayout';



export function Router() {
    return (
        <Routes>
            <Route path='/login' element={<SignIn />} />
            
            <Route path='/dashboard' element={<ProtectedRoute />}>
                <Route path='' element={<Home />}/>
            </Route>
        </Routes>
    );
}