import React, { useState } from 'react';
import { Records } from './Home/Records';
import PostForm from './Home/PostForm'
import PutForm from './Home/PutForm'
import DeleteForm from './Home/DeleteForm'
import { Link } from 'react-router-dom';

const Home = () => {
  const [activeTab, setActiveTab] = useState('')

  const DataConfig = () => {
    switch (activeTab) {
      case 'Insert':
        return <PostForm />
      case 'Update':
        return <PutForm />
      case 'Delete':
        return <DeleteForm />
      case 'Data':
        return <Records />
      default:
        return <div>
          <h1 style={{
            backgroundColor: "skyblue", minHeight: "85vh",
            fontSize: "calc(3px + 1.5vmin)", display: "flex", color: "white"
          }}>Default section
            <br />
            <br />
            Please select one of the above section to configure data ...
          </h1>
        </div>
    }
  }
  return (
    <div>
      <h1 className='App-main-header'>Data Configuration</h1>
      <div>
        <button
          style={{
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

          onClick={() => setActiveTab('Insert')}
        >Insert
        </button>
        <button
          style={{
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

          onClick={() => setActiveTab('Update')}
        >Update
        </button>
        <button
          style={{
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

          onClick={() => setActiveTab('Delete')}
        >Delete
        </button>
        <button
          style={{
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

          onClick={() => setActiveTab('Data')}
        >Data
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
      <div>{DataConfig()}</div>
    </div>
  );
};

export default Home;