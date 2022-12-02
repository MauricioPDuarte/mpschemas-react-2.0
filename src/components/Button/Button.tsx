import { ButtonContainer, ButtonVariant } from './styles';

interface ButtonProps {
    variant?: ButtonVariant;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
    children?: string;
    type?: "button" | "submit" | "reset" | undefined;
    disabled?:  boolean | undefined;
    loading?: boolean;
}

export function Button({variant = 'primary', onClick, children, type, disabled, loading = false}: ButtonProps) {
    return <ButtonContainer disabled={disabled} type={type} variant={variant} onClick={onClick}>{loading ?  'Carregando...': children }</ButtonContainer>
}