import React, { useState } from 'react';
import { Pie, PieChart, Sector } from 'recharts';

import { Container } from './style';

const renderActiveShape = props => {
    const RADIAN = Math.PI / 180
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
    } = props
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? "start" : "end"

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill='none'
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill='#333'
            >{`${payload.name}`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill='#999'
            >
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    )
}

const CheckInChart = ({ employees }) => {
    const [activeIndex, setActiveIndex] = useState(0)

    const onPieEnter = (data, index) => {
        setActiveIndex(index)
    }

    const chartData = () => {
        const checkIn = employees.filter(employee => employee.emergencyCheckIn)
        const notCheckIn = employees.filter(
            employee => employee.isAtWork && !employee.emergencyCheckIn
        )
        return [
            { name: "Check In", value: checkIn.length },
            { name: "Not Check In", value: notCheckIn.length },
        ]
    }

    return (
        <Container>
            <PieChart width={500} height={500}>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={chartData()}
                    innerRadius={120}
                    outerRadius={140}
                    fill='#8884d8'
                    dataKey='value'
                    onMouseEnter={onPieEnter}
                />
            </PieChart>
        </Container>
    )
}

export default CheckInChart
