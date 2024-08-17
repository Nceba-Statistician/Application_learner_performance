import React, { useState } from 'react'
import { Home } from './Main/Home.js'

export const Page = () => {
    const [activeTab, setActiveTab] = useState('')

    const pro_content = () => {switch (activeTab) {
        case 'Home':
            return <Home />
        case 'Predictions':
            return <div>his is the Predictions tab content.</div>
        case 'Visuals':
            return <div>This is the Visuals tab content.</div>
        case 'Data Entry':
            return <div>This is the Data Entry tab content.</div>
        default:
            return <div>This is the Home tab content.</div>
    }}
  return (
    <div>
        <div>
            <button onClick={() => setActiveTab('Home')}>Home</button>
            <button onClick={() => setActiveTab('Predictions')}>Predictions</button>
            <button onClick={() => setActiveTab('Visuals')}>Visuals</button>
            <button onClick={() => setActiveTab('Data Entry')}>Data Entry</button>
        </div>
        <div>{pro_content()}</div>
    </div>
  )
}
