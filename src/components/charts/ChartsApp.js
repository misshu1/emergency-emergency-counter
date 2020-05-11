import React from 'react';
import styled from 'styled-components';

import CheckInChart from './CheckInChart';
import DepartmentChart from './DepartmentChart';

const ChartsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media screen and (max-width: 44rem) {
        grid-template-columns: 1fr;
    }
`
const ChartsApp = ({ employees }) => {
    return (
        <ChartsContainer>
            <CheckInChart employees={employees} />
            <DepartmentChart employees={employees} />
        </ChartsContainer>
    )
}

export default ChartsApp
