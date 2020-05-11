import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: fit-content;
    margin: auto;

    .recharts-wrapper {
        width: 100% !important;
        svg {
            width: 100%;
            height: 100%;
        }
    }

    @media screen and (max-width: 75rem) {
        .recharts-wrapper {
            height: fit-content !important;
        }
    }
`
