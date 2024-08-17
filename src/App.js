import './App.css';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div style={{
      fontSize: "calc(3px + 2vmin)",
      color: "#e0e0e0",
      textAlign: "center",
      background: "linear-gradient(135deg, #2b2b2b, #3f3f3f)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Roboto', sans-serif",
    }}>
      <h1 style={{
        marginTop: "20px",
        fontSize: "4rem",
        color: "#00bfff",
        textShadow: "2px 2px 10px rgba(0, 191, 255, 0.7)"
      }}>
        Unlock Predictive Insights at Your Fingertips
      </h1>
      <p style={{
        fontSize: "1.5rem",
        color: "#a9a9a9",
        maxWidth: "600px",
        lineHeight: "1.6",
        marginTop: "20px",
      }}>
        Unleash the Power of Your Data with Our Cutting-Edge Tools and Insights.
      </p>
      <div style={{
        display: "flex",
        gap: "20px",
        marginTop: "40px"
      }}>
        <button style={{
          padding: "10px 20px",
          fontSize: "1.2rem",
          color: "#fff",
          background: "#00bfff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0px 4px 10px rgba(0, 191, 255, 0.4)",
          transition: "transform 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Link to="/Home">Home</Link>
        </button>
        <button style={{
          padding: "10px 20px",
          fontSize: "1.2rem",
          color: "#fff",
          background: "#00bfff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0px 4px 10px rgba(0, 191, 255, 0.4)",
          transition: "transform 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Link to="/Predictions">Predictions</Link>
        </button>
        <div></div>
      </div>
    </div>
  );
}
