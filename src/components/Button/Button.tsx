import { ButtonContainer } from './styles';





interface ButtonProps {
    typeStyle?: 'solid' | 'outlined';
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
    children?: string | JSX.Element;
    type?: "button" | "submit" | "reset" | undefined;
    disabled?:  boolean | undefined;
    loading?: boolean;
}

export function Button({typeStyle = 'solid', onClick, children, type, disabled, loading = false}: ButtonProps) {
    return <ButtonContainer disabled={disabled} type={type} typeStyle={typeStyle} onClick={onClick}>{loading ?  'Carregando...': children }</ButtonContainer>
}