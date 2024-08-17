import React, { useState } from 'react';

const LRegression = () => {
  const [formData, setFormData] = useState({
    Gender: "", StudyTimeWeekly: "", Absences: "", Tutoring: "",
    ParentalSupport: "", Extracurricular: "", Sports: "",
    Music: "", GradeClass: ""
  });

  const [prediction, setPrediction] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams(formData).toString();
      const response = await fetch(`http://127.0.0.1:8001/predictions?${params}`//,
        //{
          //method: "GET",
          //mode: 'no-cors',
          //headers: {'Content-Type': 'application/json'}
       // }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPrediction(data[0]);
    } catch (error) {
      setPrediction(`Error: ${error.message}`);
    }
  };

  return (
    <div className='App-prediction'>
      <h1 className='App-header'>Predict Student GPA</h1>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
        <label>
          <strong>Gender</strong>:
          <select type="text" name="Gender" value={formData.Gender} onChange={handleChange} >
          <option value="" disabled></option>
            <option value="1">Male</option>
            <option value="0">Female</option>
          </select>
        </label>
        </div>
        <br />
        <div>
        <label>
          <strong>Ethnicity</strong>:
          <input type="text" name="Ethnicity" value={formData.Ethnicity || ""} onChange={handleChange} />
        </label>
        </div>
        <br />
        <div>
        <label>
          <strong>Parental Education</strong>:
          <input type="text" name="ParentalEducation" value={formData.ParentalEducation || ""} onChange={handleChange} />
        </label>
        </div>
        <br />
        <div>
        <label>
          <strong>Study Time Weekly</strong>:
          <input type="text" name="StudyTimeWeekly" value={formData.StudyTimeWeekly || ""} onChange={handleChange} />
        </label>
        </div>
        <br />
        <div>
        <label>
          <strong>Absences</strong>:
          <input type="text" name="Absences" value={formData.Absences || ""} onChange={handleChange} />
        </label>
        </div>
        <br />
        <div>
        <label>
          <strong>Tutoring</strong>:
          <select type="text" name="Tutoring" value={formData.Tutoring} onChange={handleChange} >
          <option value="" disabled></option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </label>
        </div>
        <br />
        <div>
        <label>
          <strong>Parental Support</strong>:
          <input type="text" name="ParentalSupport" value={formData.ParentalSupport || ""} onChange={handleChange} />
        </label>
        </div>
        <br />
        <div>
        <label>
          <strong>Extracurricular</strong>:
          <select type="text" name="Extracurricular" value={formData.Extracurricular} onChange={handleChange}>
          <option value="" disabled></option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </label>
        </div>
        <br />
        <div>
        <label>
          <strong>Sports</strong>:
          <select type="text" name="Sports" value={formData.Sports} onChange={handleChange}>
          <option value="" disabled></option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </label>
        </div>
        <br />
        <div>
        <label>
          <strong>Music</strong>:
          <select type="text" name="Music" value={formData.Music} onChange={handleChange}>
          <option value="" disabled></option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </label>
        </div>
        <br />
        <div>
        <label>
          <strong>Grade Class</strong>:
          <select type="text" name="GradeClass" value={formData.GradeClass} onChange={handleChange}>
            <option value="" disabled></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </label>
        </div>
        <br />
        <button
        
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}

        className='_button'  type="submit">
          Click to predict GPA
          </button >
      </form>
      <h1 className='predict-button'>{prediction}</h1>
    </div>
  );
}

export default LRegression;

// Added Fallbacks: value={|| ""} to ensure controlled inputs have fallback values, preventing them from becoming uncontrolled.
