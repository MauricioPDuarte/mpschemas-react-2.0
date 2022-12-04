import { Routes, Route, RouteProps } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Types } from './pages/types/Types';
import { SignIn } from './pages/signin/SignIn';
import { ProtectedRoute } from './layouts/ProtectedLayout';
import { NewType } from './pages/newType';
import { Users } from './pages/users/Users';
import { SignUp } from './pages/signUp/SignUp';
import { Brands } from './pages/brands';
import { NewBrand } from './pages/newBrand';
import { Models } from './pages/listModels';
import { NewModel } from './pages/newModel';



export function Router() {
    return (
        <Routes>
            <Route path='/login' element={<SignIn />} />
            <Route path='/cadastro' element={<SignUp />} />
            




            

            <Route  element={<DefaultLayout />}>
                <Route path='/usuarios' element={<Users />}/>
                <Route path='/marcas' element={<Brands />}/>
                <Route path='/modelos' element={<Models />}/>
                <Route path='/nova_marca' element={<NewBrand />}/>
                <Route path='/nova_marca/:id' element={<NewBrand />}/>
                <Route path='/novo_modelo/:id' element={<NewModel />}/>
                <Route path='/novo_modelo' element={<NewModel />}/>
                <Route path='/tipos_dispositivos' element={<Types />}/>
                <Route path='/novo_tipo_dispositivo/:id' element={<NewType />}/>
                <Route path='/novo_tipo_dispositivo' element={<NewType />}/>
            </Route>
            
            <Route path='/' element={<ProtectedRoute />}>
           
            </Route>
        </Routes>
    );
}