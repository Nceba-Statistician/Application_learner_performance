import React, { Component } from 'react'

export class PutForm extends Component {
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

        console.log(this.state);

        const params = new URLSearchParams(this.state).toString();
        fetch(`http://127.0.0.1:8000/items_put?${params}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"}
        })
        .then(response => {
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            console.log("Records updated: ", data);
            this.setState({submissionStatus: "success"})
        })
        .catch(error => {
            console.log("Failed to update records: ", error);
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
      <h1 className='App-header'>Update records</h1>
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
        
        >Click to update Records
        </button>
      </form>
      {
        submissionStatus === "success" && (
          <h1 className='predict-button'>Record with ID {this.state.StudentID} updated successfully!</h1>
        )
      }
      {
        submissionStatus === "error" && (
          <h1 className='response-button'>Failed to update records, double check your entered records and try again!</h1>
        )
      }
      </div>
    )
  }
}

export default PutForm
