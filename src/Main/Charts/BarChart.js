import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const CustomBarChart = ({ data = [], title = "" }) => {
  return (
    <div className="chart">
      <h4>{title}</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="age" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Male" fill="rgb(30, 136, 229)" label={{ position: "top", fontSize: "15px", fill: "white"}} />
          <Bar dataKey="Female" fill="rgb(255, 105, 180)" label={{ position: "top", fontSize: "15px", fill: "white"}} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart
