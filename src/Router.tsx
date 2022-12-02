import { Routes, Route, RouteProps } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Types } from './pages/types/Types';
import { SignIn } from './pages/signin/SignIn';
import { ProtectedRoute } from './layouts/ProtectedLayout';
import { NewType } from './pages/newType/NewType';



export function Router() {
    return (
        <Routes>
            <Route path='/login' element={<SignIn />} />
            <Route path='/tipos_dispositivos' element={<Types />}/>
            <Route path='/novo_tipo_dispositivo/:id' element={<NewType />}/>
            
            <Route path='/' element={<ProtectedRoute />}>
           
            </Route>
        </Routes>
    );
}