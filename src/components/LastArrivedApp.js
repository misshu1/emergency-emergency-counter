import React from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"

const LastArrivedApp = ({ employees }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nr.</TableCell>
          <TableCell>Employee Name</TableCell>
          <TableCell align="right">Arrived at</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {employees
          .filter(employee => employee.emergencyCheckIn)
          .map((employee, index) => (
            <TableRow key={employee.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell component="th" scope="row">
                {employee.name}
              </TableCell>
              <TableCell align="right">
                {employee.emergencyCheckIn.toDate().toLocaleTimeString()}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

export default LastArrivedApp
