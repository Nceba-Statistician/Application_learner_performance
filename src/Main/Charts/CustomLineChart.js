import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomLineChart = ({ data = [], title = "" }) => {

    const order = ['Excellent', 'Satisfactory', 'Below Average', 'Poor', 'None'];
    const sortedData = [...data].sort((a, b) => order.indexOf(b.linechart) - order.indexOf(a.linechart))

    return ( // 
        <div className="chart"> 
            <h4>{title}</h4>
            <ResponsiveContainer width="100%" height={300} >
                <LineChart data={sortedData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid />
                    <XAxis dataKey="linechart" interval={"preserveStartEnd"} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                        dataKey="Male"
                        type="monotone"
                        stroke="Blue"
                        activeDot={{ r: 8 }}
                    />
                    <Line
                        dataKey="Female"
                        type="monotone"
                        stroke="Red"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomLineChart