import React, { Component } from 'react'

export class DeleteForm extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         StudentID: ""
      }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault();

        const params = new URLSearchParams(this.state).toString();

        fetch(`http://127.0.0.1:8000/items_delete?${params}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        })
        .then(response => {
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            } return response.json
        })
        .then(data => {
            console.log("Records deleted: ", data);
            this.setState({submissionStatus: "success"})
        })
        .catch(error => {
            console.log("Failed to delete Records:", error);
            this.setState({submissionStatus: "error"})
        })
    }
    
  render() {
    const {StudentID, submissionStatus} = this.state
    return (
      <div className='App-prediction'>
        <h1 className='App-header'>Delete Records</h1>
        <br />
        <form onSubmit={this.submitHandler}>
            <div>
                <label>
                    <strong>StudentID</strong>:
                    <input type="text" name="StudentID" value={StudentID} onChange={this.changeHandler} />
                </label>
            </div>
            <button
            className="_button" type="submit"
            
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            
            >Click to delete Records
            </button>
        </form>
        {
            submissionStatus === "success" && (
                <h1 className="predict-button">Record with ID {this.state.StudentID} deleted successfully!</h1>
            )
        }
        {
            submissionStatus === "error" && (
                <h1 className="predict-button">Failed to delete records, double check your entered records and try again!</h1>
            )
        }
      </div>
    )
  }
}

export default DeleteForm
