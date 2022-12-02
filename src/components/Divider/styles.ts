import styled from "styled-components";


interface DividerContainerProps {
    ml?: number;
    mr?: number;
    mt?: number;
    mb?: number;
}

export const DividerContainer = styled.div<DividerContainerProps>`
    margin-top: ${(props) => props.mt || 0}px;
    margin-left: ${(props) => props.ml || 0}px;
    margin-right: ${(props) => props.mr || 0}px;
    margin-bottom: ${(props) => props.mb || 0}px;
`;