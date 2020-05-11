import Badge from '@material-ui/core/Badge';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tabs from '@material-ui/core/Tabs';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    overflow-x: auto;
`

const BadgeIcon = ({ classes, badgeNumber }) => {
    return (
        <Badge
            className={classes.badge}
            badgeContent={badgeNumber}
            color='error'
            showZero={false}
        />
    )
}

const useStyles = makeStyles({
    tabs: {
        minHeight: "3rem",
    },
    tabIcon: {
        display: "flex",
        flexDirection: "row-reverse",
    },
    badge: {
        margin: "0 1rem !important",
    },
})

const AdminDashboardApp = ({ employees }) => {
    const classes = useStyles()
    const [openTab, setOpenTab] = useState(0)
    const [employeesAtWork, setEmployeesAtWork] = useState(0)
    const [employeesCheckIn, setEmployeesCheckIn] = useState(0)
    const [employeesNotCheckIn, setEmployeesNotCheckIn] = useState(0)

    const handleOpenTabs = (event, newValue) => {
        setOpenTab(newValue)
    }

    const atWork = employees.filter(employee => employee.isAtWork)
    const checkIn = employees.filter(employee => employee.emergencyCheckIn)
    const notCheckIn = employees.filter(
        employee => employee.isAtWork && !employee.emergencyCheckIn
    )

    useEffect(() => {
        setEmployeesAtWork(atWork.length)
        setEmployeesCheckIn(checkIn.length)
        setEmployeesNotCheckIn(notCheckIn.length)
    }, [setEmployeesAtWork, atWork, checkIn, notCheckIn])

    return (
        <Container>
            <Paper square>
                <Tabs
                    value={openTab}
                    indicatorColor='primary'
                    textColor='primary'
                    onChange={handleOpenTabs}
                    centered
                    variant='fullWidth'
                >
                    <Tab
                        label='At Work'
                        classes={{ wrapper: classes.tabIcon }}
                        className={classes.tabs}
                        icon={
                            <BadgeIcon
                                classes={classes}
                                badgeNumber={employeesAtWork}
                            />
                        }
                    />
                    <Tab
                        label='Check In'
                        classes={{ wrapper: classes.tabIcon }}
                        className={classes.tabs}
                        icon={
                            <BadgeIcon
                                classes={classes}
                                badgeNumber={employeesCheckIn}
                            />
                        }
                    />
                    <Tab
                        label='Not Check In'
                        classes={{ wrapper: classes.tabIcon }}
                        className={classes.tabs}
                        icon={
                            <BadgeIcon
                                classes={classes}
                                badgeNumber={employeesNotCheckIn}
                            />
                        }
                    />
                </Tabs>
            </Paper>
            {openTab === 0 && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nr.</TableCell>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Department</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {atWork.map((employee, index) => (
                            <TableRow key={employee.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell component='th' scope='row'>
                                    {employee.name}
                                </TableCell>
                                <TableCell component='th' scope='row'>
                                    {employee.department}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            {openTab === 1 && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nr.</TableCell>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Department</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {checkIn.map((employee, index) => (
                            <TableRow key={employee.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell component='th' scope='row'>
                                    {employee.name}
                                </TableCell>{" "}
                                <TableCell component='th' scope='row'>
                                    {employee.department}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            {openTab === 2 && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nr.</TableCell>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Department</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notCheckIn.map((employee, index) => (
                            <TableRow key={employee.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell component='th' scope='row'>
                                    {employee.name}
                                </TableCell>{" "}
                                <TableCell component='th' scope='row'>
                                    {employee.department}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </Container>
    )
}

export default AdminDashboardApp
