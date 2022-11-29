import styled from "styled-components";

export const HeaderContainer = styled.div`
    margin-bottom: 30px;
    width: 100%;
    background-color: ${props => props.theme["gray-700"]};
    padding: 1.5rem 3.5rem 1.5rem 3.5rem;
    justify-content: space-between;
    align-items: center;
    display: flex;

    h1 {
        color: ${props => props.theme["blue-500"]};
        font-size: 1.2rem;
    }

    button {
        background: transparent;
        border: none;
        outline: none;
    }
`;