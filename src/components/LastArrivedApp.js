import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    overflow-x: auto;
`

const LastArrivedApp = ({ employees }) => {
    const filterCheckInEmployees = employees.filter(
        employee => employee.emergencyCheckIn
    )

    return (
        <Container>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nr.</TableCell>
                        <TableCell>Employee Name</TableCell>
                        <TableCell align='right'>Department</TableCell>
                        <TableCell align='right'>Arrived at</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filterCheckInEmployees
                        .sort(
                            (a, b) =>
                                new Date(b.emergencyCheckIn.toDate()) -
                                new Date(a.emergencyCheckIn.toDate())
                        )
                        .map((employee, index) => (
                            <TableRow key={employee.id}>
                                <TableCell>
                                    {filterCheckInEmployees.length - index}
                                </TableCell>
                                <TableCell component='th' scope='row'>
                                    {employee.name}
                                </TableCell>
                                <TableCell align='right'>
                                    {employee.department}
                                </TableCell>
                                <TableCell align='right'>
                                    {employee.emergencyCheckIn
                                        .toDate()
                                        .toLocaleTimeString()}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </Container>
    )
}

export default LastArrivedApp
