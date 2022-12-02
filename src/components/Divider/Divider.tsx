import { DividerContainer } from "./styles";

interface DividerProps {
    ml?: number;
    mr?: number;
    mt?: number;
    mb?: number;
}

export function Divider({...props}: DividerProps) {
    return (
        <DividerContainer {...props} />
    )
}