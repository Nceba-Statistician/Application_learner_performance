import React, { useState } from 'react'
import LRegression from './Predictions/Regression.js'
import { Link } from 'react-router-dom';
import Dashboard from './Predictions/Dashboard.js'

const Home = () => {
  const [activeTab, setActiveTab] = useState('')

  const Home_Tab = () => {
    switch (activeTab) {
      case 'Regression':
        return <LRegression />
      case 'Dashboard':
        return <Dashboard />
      default:
        return <div>
          <h1 style={{
            backgroundColor: "skyblue", minHeight: "85vh",
            fontSize: "calc(3px + 1.5vmin)", display: "flex", color: "white"
          }}>Default section
            <br />
            <br />
            Please select one of the above section for analysis / dashboard ...
          </h1>
        </div>
    }
  }
  return (
    <div>
      <h1 className='App-main-header'>Analysis - dashboard</h1>
      <div>
        <button style={{
          padding: "10px 20px",
          fontSize: "1rem",
          color: "#fff",
          background: "#00bfff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "8px 8px 10px rgba(0, 191, 255, 0.8)",
          transition: "transform 0.2s",
          margin: "10px"
        }}

          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}

          onClick={() => setActiveTab('Regression')}

        >Regression
        </button>

        <button style={{
          padding: "10px 20px",
          fontSize: "1rem",
          color: "#fff",
          background: "#00bfff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "8px 8px 10px rgba(0, 191, 255, 0.8)",
          transition: "transform 0.2s",
          margin: "10px"
        }}

          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}

          onClick={() => setActiveTab('Dashboard')}

        >Dashboard
        </button>

        <button style={{
          padding: "10px 20px",
          fontSize: "1rem",
          color: "#fff",
          background: "#00bfff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "8px 8px 10px rgba(0, 191, 255, 0.8)",
          transition: "transform 0.2s",
          margin: "10px"
        }}

          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}

          onClick={() => setActiveTab()}

        ><Link to="/">Back to main page</Link>
        </button>
      </div>
      <div>{Home_Tab()}</div>
    </div>
  )
}
export default Home;
