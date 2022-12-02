import styled from "styled-components";

export const InputContainer = styled.div`
    width: 100%;

    label {
        font-size: 12px;
        color:  ${props => props.theme["gray-400"]};
    }

    p {
        color:  ${props => props.theme["red-500"]};
        margin-top: 4px;
        font-size: 12px;
    }
 
`;

export const FieldInput = styled.input`
    height: 50px;
    width: 100%;
    border-radius: 5px;
    background-color: ${props => props.theme["gray-600"]};
    border: none;
    padding: 0 15px;
    color:  ${props => props.theme["gray-500"]};
`;
