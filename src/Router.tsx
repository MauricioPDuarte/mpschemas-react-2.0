import { Routes, Route, RouteProps } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Types } from './pages/types/Types';
import { ProtectedRoute } from './layouts/ProtectedLayout';
import { NewType } from './pages/newType';
import { Users } from './pages/users/Users';
import { SignUp } from './pages/signUp/SignUp';
import { Brands } from './pages/brands';
import { NewBrand } from './pages/newBrand';
import { Models } from './pages/listModels';
import { NewModel } from './pages/newModel';
import {  Schemas } from './pages/listSchemas';
import { NewSchema } from './pages/newSchema';
import { SignIn } from './pages/signin';
import { Dashboard } from './pages/dashboard';
import FAQ from './pages/faq';
import { ForgotPassword } from './pages/forgotPassword';
import { ChangePassword } from './pages/changePassword';



export function Router() {
    return (
        <Routes>
            <Route path='/login' element={<SignIn />} />
            <Route path='/recuperar_senha' element={<ForgotPassword />} />
            <Route path='/alterar_senha' element={<ChangePassword />} />
            <Route path='/cadastro' element={<SignUp />} />
            




            


            <Route  element={<DefaultLayout />}>
                <Route path='/dashboard' element={<Dashboard />}/>
                <Route path='/usuarios' element={<Users />}/>
                <Route path='/marcas' element={<Brands />}/>
                <Route path='/modelos' element={<Models />}/>
                <Route path='/esquemas' element={<Schemas />}/>
                <Route path='/novo_esquema' element={<NewSchema />}/>
                <Route path='/novo_esquema/:id' element={<NewSchema />}/>
                <Route path='/nova_marca' element={<NewBrand />}/>
                <Route path='/nova_marca/:id' element={<NewBrand />}/>
                <Route path='/novo_modelo/:id' element={<NewModel />}/>
                <Route path='/novo_modelo' element={<NewModel />}/>
                <Route path='/tipos_dispositivos' element={<Types />}/>
                <Route path='/novo_tipo_dispositivo/:id' element={<NewType />}/>
                <Route path='/novo_tipo_dispositivo' element={<NewType />}/>
                <Route path='/faq' element={<FAQ />}/>
            </Route>
            
            <Route path='/' element={<ProtectedRoute />}>
           
            </Route>
        </Routes>
    );
}