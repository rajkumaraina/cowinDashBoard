import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'

import VaccinationByGender from '../VaccinationByGender'

import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const ApiViews = {
  loading: 'Loading',
  success: 'Success',
  failure: 'Failure',
}
/*
<div className="container">
          <h1 className="heading">Vaccination Coverage</h1>
          <BarChart
            width={1000}
            height={400}
            data={vaccineCoverage}
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
              tickFormatter={this.DataFormatter}
              tick={{
                stroke: 'gray',
                strokeWidth: 0,
              }}
            />
            <Legend
              wrapperStyle={{
                padding: 30,
              }}
            />
            <Bar dataKey="dose1" name="Dose 1" fill="#1f77b4" barSize="20%" />
            <Bar dataKey="dose2" name="Dose 2" fill=" #f54394" barSize="20%" />
          </BarChart>
        </div>
        <div className="container">
          <h1 className="heading">Vaccination By Gender</h1>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                cx="50%"
                cy="80%"
                data={vaccineGender}
                startAngle={0}
                endAngle={180}
                innerRadius="40%"
                outerRadius="0%"
                dataKey="count"
              >
                <Cell name="Male" fill="#fecba6" />
                <Cell name="Female" fill="#b3d23f" />
                <Cell name="Others" fill="#a44c9e" />
              </Pie>
              <Legend
                iconType="circle"
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
*/

class CowinDashboard extends Component {
  state = {
    view: ApiViews.loading,
    vaccineCoverage: [],
    vaccineAge: [],
    vaccineGender: [],
  }

  componentDidMount = async () => {
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const vaccinationCoverageData = data.last_7_days_vaccination.map(
        each => ({
          vaccineData: each.vaccine_date,
          dose1: each.dose_1,
          dose2: each.dose_2,
        }),
      )
      const vaccinationByAge = data.vaccination_by_age
      const vaccinationByGender = data.vaccination_by_gender
      console.log(vaccinationCoverageData)
      console.log(vaccinationByAge)
      console.log(vaccinationByGender)
      this.setState({
        view: ApiViews.success,
        vaccineCoverage: vaccinationCoverageData,
        vaccineAge: vaccinationByAge,
        vaccineGender: vaccinationByGender,
      })
    } else {
      this.setState({view: ApiViews.failure})
    }
  }

  renderSuccessView = () => {
    const {vaccineAge, vaccineGender, vaccineCoverage} = this.state
    return (
      <div>
        <VaccinationCoverage item={vaccineCoverage} />
        <VaccinationByGender item={vaccineGender} />
        <VaccinationByAge item={vaccineAge} />
      </div>
    )
  }

  renderFailureView = () => (
    <div className="containerTwo">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure"
      />
      <h1 className="failureHeading">Something Went Wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div className="containerTwo">
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    </div>
  )

  renderView = () => {
    const {view} = this.state
    switch (view) {
      case ApiViews.success:
        return this.renderSuccessView()
      case ApiViews.failure:
        return this.renderFailureView()
      case ApiViews.loading:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="mainContainer">
        <div className="insideContainer">
          <div className="topContainer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="logo"
            />
            <h1 className="websiteName">Co-WIN</h1>
          </div>
          <h1 className="Description">CoWIN Vaccination in India</h1>
          <div className="resultContainer">{this.renderView()}</div>
        </div>
      </div>
    )
  }
}

export default CowinDashboard
