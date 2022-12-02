import { InputHTMLAttributes } from "react";
import { FieldInput, InputContainer } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string | null;
}

export function Input({label, error, ...props}: InputProps) {
    return (
        <InputContainer>
            <label>{label}</label>
            <FieldInput {...props}/>
            <p>{error}</p>
        </InputContainer>
    );
}