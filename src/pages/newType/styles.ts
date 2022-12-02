import styled from "styled-components";

export const NewTypeContainer = styled.main`
    flex: 1;


    display: flex;
    flex-direction: column;

    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;

    @media (min-width: 768px) {
        width: 750px;
    }
    @media (min-width: 992px) {
        width: 970px;
    }

    @media (min-width: 1200px) {
        width: 1170px;
    }

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

export const ActionsPage = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;

    &:nth-child(1) {
        margin-right: 20px;
    }
`;