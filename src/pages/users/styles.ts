import styled from "styled-components";

export const UsersContainer = styled.main`
    flex: 1;
    padding: 0 3.5rem 3.5rem 3.5rem;

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

    }

    h5 {
        font-size: 0.875rem;
        color: ${props => props.theme['gray-300']};
        font-weight: 300;
    }
`;

export const HeaderTable = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
` 



export const UsersList = styled.div`
    flex: 1;
    overflow: auto;
    margin-top: 1.3rem;

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
            padding: 0.5rem 0;
            font-size: 0.875rem;
            line-height: 1.6;
            text-align: left;

            &:first-child {
                padding-left: 1.5rem;
            }

            &:nth-child(2) {
                width: 30%;
            }

            &:nth-child(4) button {
                margin-right: 5px;
            }


            &:last-child {
                padding-right: 1.5rem;
            }
        }

       
    }
`;
