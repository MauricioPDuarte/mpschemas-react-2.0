import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import SidebarWithHeader from "../components/Navbar";

export function DefaultLayout() {
    return (
        <>
            <SidebarWithHeader>
 
                    <Outlet />
        
            </SidebarWithHeader>
           
        </>
  
    );
}