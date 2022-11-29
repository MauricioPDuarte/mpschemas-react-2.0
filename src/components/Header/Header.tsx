import { HeaderContainer } from "./styles";
import { FaSignOutAlt } from 'react-icons/fa';
import { defaultTheme } from "../../styles/themes/default";
import { useAuth } from "../../hooks/auth";


export function Header() {

    const {signOut} = useAuth();
    return (
        <HeaderContainer>
            <h1>LW</h1>

            <button><FaSignOutAlt color={defaultTheme['gray-400']} size={20} onClick={signOut} /></button>
         </HeaderContainer>
    )
}