import React, { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const CustomPieChart = ({ data = [], title = "" }) => {
    const [activeIndex, setActiveIndex] = useState(-1)

    const colors = ['#E3F2FD', '#90CAF9', '#42A5F5', '#1E88E5', '#0D47A1'];
    const order = ['Excellent', 'Satisfactory', 'Below Average', 'Poor', 'None'];
    const sortedData = [...data].sort((a, b) => order.indexOf(b.category) - order.indexOf(a.category));

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    }

    return (
        <div className="chart">
            <h4>{title}</h4>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        activeIndex={activeIndex}
                        data={sortedData}
                        dataKey="Male"
                        nameKey="category"
                        outerRadius={150}
                        fill="green"
                        onMouseEnter={onPieEnter}
                        style={{ cursor: 'pointer', outline: 'none' }}
                    >
                        {sortedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend layout="vertical" align="left" verticalAlign="middle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomPieChart;
