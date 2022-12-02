import styled, {css} from 'styled-components';



interface ButtonContainerProps {
    typeStyle: 'solid' | 'outlined';
}


export const ButtonContainer = styled.button<ButtonContainerProps>`
    max-width: 100px;
    padding: 12px 20px;
    height: 40px;
    background-color:  ${props => props.typeStyle == "solid" ? props.theme['blue-500'] : 'transparent'};
    color: ${props => props.typeStyle == "solid" ? props.theme.white :  props.theme['blue-500']};
    border:  1px solid ${props => props.typeStyle == "solid" ?  'transparent' : props.theme['blue-500']};
    font-size: 12px;
    border-radius: 4px;
   

`;