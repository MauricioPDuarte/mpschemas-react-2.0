import { Container } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { Header } from "../components/Header/Header";
import SidebarWithHeader from "../components/Navbar";
import { useAuth } from "../hooks/auth";

export function DefaultLayout() {
    const { user } = useAuth();

    console.log('user', user);

    if (!user) {

        console.log(user);
        return <Navigate to="/login" />;
    }

    return (
        <>
            <SidebarWithHeader>
 
                    <Outlet />
                    <Footer/>
        
            </SidebarWithHeader>
           
        </>
  
    );
}