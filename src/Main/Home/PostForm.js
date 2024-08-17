import React, { Component } from 'react'

class PostForm extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        StudentID: "", Age: "", Gender: "", Ethnicity: "", ParentalEducation: "",
        StudyTimeWeekly: "", Absences: "", Tutoring: "", ParentalSupport: "",
        Extracurricular: "", Sports: "", Music: "", Volunteering: "",
        GPA: "", GradeClass: ""
      }
    }
    changeHandler = (e) => {
      this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault();
        
        // const formattedData = {
            //StudentID: parseInt(this.state.StudentID, 10), Age: parseInt(this.state.Age, 10),
            // Gender: this.state.Gender ? 1:0, Ethnicity: parseInt(this.state.Ethnicity, 10),
            //ParentalEducation: parseInt(this.state.ParentalEducation, 10), StudyTimeWeekly: parseFloat(this.state.StudyTimeWeekly),
            // Absences: parseInt(this.state.Absences, 10), Tutoring: this.state.Tutoring ? 1:0,
            //ParentalSupport: parseInt(this.state.ParentalSupport, 10), Extracurricular: this.state.Extracurricular ? 1:0,
            //Sports: this.state.Sports ? 1:0, Music: this.state.Music ? 1:0,
            //Volunteering: this.state.Volunteering ? 1:0, GPA: parseFloat(this.state.GPA),
            //GradeClass: parseInt(this.state.GradeClass, 10)
          // }
        console.log(this.state)

        const params = new URLSearchParams(this.state).toString();
        fetch(`http://127.0.0.1:8000/items_post?${params}`, {
          method: "POST",
          headers: {"Content-Type": "application/json"}//,
            //body: JSON.stringify(this.state // {
              //StudentID: parseInt(this.state.StudentID, 10), Age: parseInt(this.state.Age, 10),
              //Gender: parseInt(this.state.Gender, 10), Ethnicity: parseInt(this.state.Ethnicity, 10),
              //ParentalEducation: parseInt(this.state.ParentalEducation, 10), StudyTimeWeekly: parseFloat(this.state.StudyTimeWeekly),
              //Absences: parseInt(this.state.Absences, 10), Tutoring: parseInt(this.state.Tutoring, 10),
              //ParentalSupport: parseInt(this.state.ParentalSupport, 10), Extracurricular: parseInt(this.state.Extracurricular, 10),
              //Sports: parseInt(this.state.Sports, 10), Music: parseInt(this.state.Music, 10),
              //Volunteering: parseInt(this.state.Volunteering, 10), GPA: parseFloat(this.state.GPA),
              //GradeClass: parseInt(this.state.GradeClass, 10)
        //})
      }
        )
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json()
        })
        .then(data => {
          console.log("Records submitted: ", data);
          this.setState({submissionStatus: "success"})
        })
        .catch(error => {
          console.log("No records submitted: ", error);
          this.setState({submissionStatus: "error"})
        })
    }

  render() {
    const { StudentID, Age, Gender, Ethnicity, ParentalEducation,
        StudyTimeWeekly, Absences, Tutoring, ParentalSupport,
        Extracurricular, Sports, Music, Volunteering, GPA, GradeClass, submissionStatus
    } = this.state
    return (
      <div className='App-prediction'>
      <h1 className='App-header'>Submit records</h1>
      <form onSubmit={this.submitHandler}>
      <div>
        <label>
          <strong>StudentID</strong>:
          <input type="text" name="StudentID" value={StudentID} onChange={this.changeHandler} />
        </label>
        </div>
        <br />
        <div>
        <label>
          <strong>Age</strong>:
          <input type="text" name="Age" value={Age} onChange={this.changeHandler} />
        </label>
        </div>
        <br />
        <div>
        <label>
          <strong>Gender</strong>:
          <select type="text" name="Gender" value={Gender} onChange={this.changeHandler} >
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
          <input type="text" name="Ethnicity" value={Ethnicity} onChange={this.changeHandler} />
        </label>
        </div>
        <br />
        <div>
        <label>
          <strong>Parental Education</strong>:
          <input type="text" name="ParentalEducation" value={ParentalEducation} onChange={this.changeHandler} />
        </label>
        </div>
        <br />
        <div>
        <label>
          <strong>Study Time Weekly</strong>:
          <input type="text" name="StudyTimeWeekly" value={StudyTimeWeekly} onChange={this.changeHandler} />
        </label>
        </div>
        <br />
        <div>
        <label>
          <strong>Absences</strong>:
          <input type="text" name="Absences" value={Absences} onChange={this.changeHandler} />
        </label>
        </div>
        <br />
        <div>
        <label>
          <strong>Tutoring</strong>:
          <select type="text" name="Tutoring" value={Tutoring} onChange={this.changeHandler} >
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
          <input type="text" name="ParentalSupport" value={ParentalSupport} onChange={this.changeHandler} />
        </label>
        </div>
        <br />
        <div>
        <label>
          <strong>Extracurricular</strong>:
          <select type="text" name="Extracurricular" value={Extracurricular} onChange={this.changeHandler}>
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
          <select type="text" name="Sports" value={Sports} onChange={this.changeHandler}>
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
          <select type="text" name="Music" value={Music} onChange={this.changeHandler}>
          <option value="" disabled></option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </label>
        </div>
        <br />
        <div>
        <label>
          <strong>Volunteering</strong>:
          <select type="text" name="Volunteering" value={Volunteering} onChange={this.changeHandler}>
          <option value="" disabled></option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </label>
        </div>
        <br />
        <div>
        <label>
          <strong>GPA</strong>:
          <input type="text" name="GPA" value={GPA} onChange={this.changeHandler} />
        </label>
        </div>
        <br />
        <div>
        <label>
          <strong>Grade Class</strong>:
          <select type="text" name="GradeClass" value={GradeClass} onChange={this.changeHandler}>
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
        className='_button' type="submit"
        
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        
        >Click to submit Records
        </button>
      </form>
      {
        submissionStatus === "success" && (
          <h1 className='predict-button'>Record with ID {this.state.StudentID} submitted successfully!</h1>
        )
      }
      {
        submissionStatus === "error" && (
          <h1 className='predict-button'>Failed to submit records, double check your entered records and try again!</h1>
        )
      }
      </div>
    )
  }
}

export default PostForm
