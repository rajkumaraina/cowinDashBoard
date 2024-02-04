import './index.css'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const VaccinationCoverage = props => {
  const {item} = props
  console.log(item)
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="container">
      <h1 className="heading">Vaccination Coverage</h1>
      <BarChart
        width={900}
        height={400}
        data={item}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccineData"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          iconType="rect"
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar dataKey="dose1" name="Dose 1" fill="#1f77b4" barSize="20%" />
        <Bar dataKey="dose2" name="Dose 2" fill=" #f54394" barSize="20%" />
      </BarChart>
    </div>
  )
}
export default VaccinationCoverage
