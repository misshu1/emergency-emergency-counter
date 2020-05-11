import React from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts';

import { Container } from './style';

const DepartmentChart = ({ employees }) => {
    const checkInDepartment = department => {
        return employees.filter(employee => {
            return (
                employee.emergencyCheckIn && employee.department === department
            )
        })
    }

    const generateData = () => {
        const uniqueDepartmentsSet = new Set(
            employees.map(employee => employee.department)
        )
        const uniqueDepartmentsArray = [...new Set(uniqueDepartmentsSet)]
        const data = uniqueDepartmentsArray.map(department => ({
            department,
            value: checkInDepartment(department).length,
        }))

        return data
    }

    return (
        <Container>
            <RadarChart
                outerRadius={150}
                width={500}
                height={500}
                data={generateData()}
            >
                <PolarGrid />
                <PolarAngleAxis dataKey='department' />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar
                    name='Departments'
                    dataKey='value'
                    stroke='#8884d8'
                    fill='#8884d8'
                    fillOpacity={0.6}
                />
            </RadarChart>
        </Container>
    )
}

export default DepartmentChart
