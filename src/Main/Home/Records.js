import React, { useEffect, useState } from 'react'

export const Records = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/items_get")
                if (!response.ok) { throw new Error("Network response was not ok") }
                const results = await response.json();
                setData(results);
            } catch (error) { setError(error) }
            finally { setLoading(false) }
        }

        fetchdata()
    }, [])

    if (loading) { return <div>Loading ...</div> }
    if (error) { return <div>Error: {error.message}</div> }

    return ( //className="table-container"
        <div > 
            <table className="ai-table" border="1">
                <thead><tr>
                    <th>StudentID</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Ethnicity</th>
                    <th>ParentalEducation</th>
                    <th>StudyTimeWeekly</th>
                    <th>Absences</th>
                    <th>Tutoring</th>
                    <th>ParentalSupport</th>
                    <th>Extracurricular</th>
                    <th>Sports</th>
                    <th>Music</th>
                    <th>Volunteering</th>
                    <th>GPA</th>
                    <th>GradeClass</th>
                </tr></thead>
                <tbody>
                    {data.map((item) => (<tr key={item.StudentID}>
                        <td>{item.StudentID}</td>
                        <td>{item.Age}</td>
                        <td>{item.Gender ? "Male" : "Female"}</td>
                        <td>{item.Ethnicity}</td>
                        <td>{item.ParentalEducation}</td>
                        <td>{item.StudyTimeWeekly.toFixed(2)}</td>
                        <td>{item.Absences}</td>
                        <td>{item.Tutoring ? "Yes" : "No"}</td>
                        <td>{item.ParentalSupport}</td>
                        <td>{item.Extracurricular ? "Yes" : "No"}</td>
                        <td>{item.Sports ? "Yes" : "No"}</td>
                        <td>{item.Music ? "Yes" : "No"}</td>
                        <td>{item.Volunteering ? "Yes" : "No"}</td>
                        <td>{item.GPA.toFixed(2)}</td>
                        <td>{item.GradeClass}</td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    )
}
