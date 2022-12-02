import styled from "styled-components";

export const NewTypeContainer = styled.main`
    flex: 1;
    padding: 0 3.5rem 3.5rem 3.5rem;

    display: flex;
    flex-direction: column;

    h1 {
        font-size: 1.3rem;
        color: ${props => props.theme['gray-400']};
        margin-bottom: 30px;
    }

    h5 {
        font-size: 0.875rem;
        color: ${props => props.theme['gray-300']};
        font-weight: 300;
    }
`;



export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;