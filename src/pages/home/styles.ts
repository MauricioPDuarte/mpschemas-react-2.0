import styled from "styled-components";

export const HomeContainer = styled.main`
    flex: 1;
    padding: 0 3.5rem 3.5rem 3.5rem;

    display: flex;
    flex-direction: column;

    h1 {
        font-size: 1.3rem;
        color: ${props => props.theme['gray-400']};
    }

    h5 {
        font-size: 0.875rem;
        color: ${props => props.theme['gray-300']};
        font-weight: 300;
    }
`;

export const LogList = styled.div`
    flex: 1;
    overflow: auto;
    margin-top: 2rem;

    table {
        width: 100%;
        border-collapse: collapse;
        min-width: 600px;

        th {
            background-color: ${props => props.theme["gray-600"]};
            color: ${props => props.theme["gray-100"]};
            padding: 1rem 0;
            text-align: left;
            font-size: 0.875rem;
            line-height: 1.6;

            &:first-child {
                border-top-left-radius: 8px;
                padding-left: 1.5rem;
            }

            &:last-child {
                border-top-right-radius: 8px;
                padding-right: 1.5rem;
            }
        }

        td {
            background-color: ${props => props.theme["gray-700"]};
            border-top: 4px solid ${props => props.theme["gray-800"]};
            padding: 1.5rem 0;
            font-size: 0.875rem;
            line-height: 1.6;
            text-align: left;

            &:first-child {
                width: 40%;
                padding-left: 1.5rem;
            }

            &:last-child {
                padding-right: 1.5rem;
            }
        }

       
    }
`;

export const BlocDetails = styled.div`
    flex-direction: row;
    margin-left: 10px;
`;

export const Blocs = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 30px;
`;

export const Bloc = styled.div`
    background-color: ${props => props.theme["gray-700"]};
    width: 300px;
    height: 130px;
    border-radius: 5px;
    padding: 3rem;
    display: flex;
    justify-content: start;
    align-items: center;
    margin-right: 17px;

    span {
        font-size: 0.87rem;
    }

    h3 {
        font-size: 1.3rem;
    }
`;