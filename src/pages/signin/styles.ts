import styled from "styled-components";

export const SignInContainer = styled.div`
    flex: 1;
    
    display: flex;

    justify-content: center;
    align-items: center;

`;

export const Bloc = styled.div`
    width: 300px;
    margin-top: 10%;
    background-color: ${props => props.theme["gray-600"]};
    border-radius: 5px;
    padding: 1.5rem;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
        font-size: 1.6rem;
        margin-bottom: 30px;
    }
    
    input {
        width: 100%;
        padding: 0.9rem 0.6rem 0.9rem 0.6rem;
        background: ${props => props.theme["gray-700"]};
        border-radius: 5px;
        margin-bottom: 10px;
        border: none;
        box-shadow: 0;
        font-size: 0.865rem;
        color: ${props => props.theme["gray-400"]};
    }

    button {
        background: ${props => props.theme["blue-500"]};
        border-radius: 5px;
        width: 100%;
        padding: 0.9rem 0.6rem 0.9rem 0.6rem;
        color: ${props => props.theme.white};
        border: none;
        font-size: 0.725rem;

    }

    button:hover{
        background-color: ${props => props.theme["blue-600"]};
        transition: 0.7s;
    }
`;