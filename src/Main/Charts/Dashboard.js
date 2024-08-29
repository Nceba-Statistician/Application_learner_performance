import React, { useEffect, useRef, useState } from 'react'
import SummaryCard from './SummaryCard'
import BarChart from './BarChart'
import LineChart from './CustomLineChart'
import PieChartM from './MaleCustomPieChart'
import PieChartF from './FemaleCustomPieChart'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

function Dashboard() {

    const pdfRef = useRef();

    const downloadPDF = () => {
        const input = pdfRef.current;
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL("image/png")
                const pdf = new jsPDF("p", "mm", "a4", "true")
                const pdfWidth = pdf.internal.pageSize.getWidth()
                const pdfHeight = pdf.internal.pageSize.getHeight()
                const imgWidth = canvas.width
                const imgHeight = canvas.height
                const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
                const imgX = (pdfWidth - imgWidth * ratio) / 2;
                const imgY = 30;

                pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio)
                pdf.save("Dashboard.pdf")
            })
    }

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch("http://127.0.0.1:8000/items_processed")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                return response.json()
            })
            .then(data => {
                setData(data)
                console.log("Fetched data:  ", data)
            })
            .catch(error => {
                setError(error)
                console.log("Error fetching data: ", error)
            })
            .finally(setLoading(false))
    }, [])

    if (loading) { return <div>Loading .. </div> }
    if (error) { return <div>Error: {error.message}</div> }

    const processedData = CalculationProcessedData(data)

    function CalculationProcessedData() {

        const CalculateAvgGpaMale = () => {
            const MaleGpaValues = data
                .map(item => item.MaleGPA)
                .filter(value => value !== null && value !== undefined)

            const SumMaleGpa = MaleGpaValues.reduce((acc, curr) => acc + curr, 0)
            return parseFloat((SumMaleGpa / MaleGpaValues.length).toFixed(2))
        }
        const CalculateAvgGpaFemale = () => {
            const FemaleGpaValues = data
                .map(item => item.FemaleGPA)
                .filter(value => value !== null && value !== undefined)

            const SumFemaleGpa = FemaleGpaValues.reduce((acc, curr) => acc + curr, 0)
            return parseFloat((SumFemaleGpa / FemaleGpaValues.length).toFixed(2))
        }
        const CalculateAvgAbsencesMale = () => {
            const MaleAbsencesValues = data
                .map(item => item.MaleAbsences)
                .filter(value => value !== null && value !== undefined)

            const SumMaleAbsences = MaleAbsencesValues.reduce((acc, curr) => acc + curr, 0)
            return parseFloat((SumMaleAbsences / MaleAbsencesValues.length).toFixed(2))
        }
        const CalculateAvgAbsencesFemale = () => {
            const FemaleAbsencesValues = data
                .map(item => item.FemaleAbsences)
                .filter(value => value !== null && value !== undefined)

            const SumFemaleAbsences = FemaleAbsencesValues.reduce((acc, curr) => acc + curr, 0)
            return parseFloat((SumFemaleAbsences / FemaleAbsencesValues.length).toFixed(2))
        }
        const CalculateGenderAverageGpaByAgeGroup = () => {
            const HandleFieldsGpaByAgeGroup = data
                .filter(item => {
                    const hasValidMaleGpa = item.MaleGPA !== null && item.MaleGPA !== undefined
                    const hasValidFemaleGpa = item.FemaleGPA !== null && item.FemaleGPA !== undefined
                    const hasValidAge = item.Age !== null && item.Age !== undefined

                    return hasValidMaleGpa && hasValidFemaleGpa && hasValidAge;
                })
                .map(item => ({
                    MaleGPA: item.MaleGPA,
                    FemaleGPA: item.FemaleGPA,
                    Age: item.Age
                }));

            const ageGroups = {}

            HandleFieldsGpaByAgeGroup.forEach(item => {
                if (item.Age && item.MaleGPA && item.FemaleGPA) {
                    if (!ageGroups[item.Age]) {
                        ageGroups[item.Age] = {
                            age: item.Age,
                            totalMGpa: 0,
                            totalFGpa: 0,
                            countM: 0,
                            countF: 0
                        }
                    }
                    ageGroups[item.Age].totalMGpa += item.MaleGPA;
                    ageGroups[item.Age].totalFGpa += item.FemaleGPA;
                    ageGroups[item.Age].countM += 1;
                    ageGroups[item.Age].countF += 1;
                } else {
                    console.error("Invalid item found in HandleFieldsGpaByAgeGroup:", item);
                }
            })

            const result = Object.keys(ageGroups).map(age => ({
                age,
                'Male': parseFloat((ageGroups[age].totalMGpa / ageGroups[age].countM).toFixed(2)),
                'Female': parseFloat((ageGroups[age].totalFGpa / ageGroups[age].countF).toFixed(2))
            }))

            return result

        }
        const CalculateGenderAverageStudyTimeWeeklyByAgeGroup = () => {
            const HandleFieldsStudyTimeWeeklyByAgeGroup = data
                .filter(item => {
                    const hasValidMaleStudyTimeWeekly = item.MaleStudyTimeWeekly !== null && item.MaleStudyTimeWeekly !== undefined
                    const hasValidFemaleStudyTimeWeekly = item.FemaleStudyTimeWeekly !== null && item.FemaleStudyTimeWeekly !== undefined
                    const hasValidAge = item.Age !== null && item.Age !== undefined

                    return hasValidMaleStudyTimeWeekly && hasValidFemaleStudyTimeWeekly && hasValidAge;
                })
                .map(item => ({
                    MaleStudyTimeWeekly: item.MaleStudyTimeWeekly,
                    FemaleStudyTimeWeekly: item.FemaleStudyTimeWeekly,
                    Age: item.Age
                }))

            const ageGroups = {}

            HandleFieldsStudyTimeWeeklyByAgeGroup.forEach(item => {
                if (item.Age && item.MaleStudyTimeWeekly && item.FemaleStudyTimeWeekly) {
                    if (!ageGroups[item.Age]) {
                        ageGroups[item.Age] = {
                            age: item.Age,
                            totalMStudyTimeWeekly: 0,
                            totalFStudyTimeWeekly: 0,
                            countM: 0,
                            countF: 0
                        };
                    }
                    ageGroups[item.Age].totalMStudyTimeWeekly += item.MaleStudyTimeWeekly;
                    ageGroups[item.Age].totalFStudyTimeWeekly += item.FemaleStudyTimeWeekly;
                    ageGroups[item.Age].countM += 1;
                    ageGroups[item.Age].countF += 1;
                } else {
                    console.error("Invalid item found in HandleFieldsStudyTimeWeeklyByAgeGroup:", item)
                }
            })

            const result = Object.keys(ageGroups).map(linechart => ({
                linechart,
                'Male': parseFloat((ageGroups[linechart].totalMStudyTimeWeekly / ageGroups[linechart].countM).toFixed(2)),
                'Female': parseFloat((ageGroups[linechart].totalFStudyTimeWeekly / ageGroups[linechart].countF).toFixed(2))
            }))

            return result

        }

        const CalculateGenderAverageAbsencesByAgeGroup = () => {
            const HandleFieldsStudyTimeWeeklyByAgeGroup = data
                .filter(item => {
                    const hasValidMaleAbsences = item.MaleAbsences !== null && item.MaleAbsences !== undefined
                    const hasValidFemaleAbsences = item.FemaleAbsences !== null && item.FemaleAbsences !== undefined
                    const hasValidAge = item.Age !== null && item.Age !== undefined

                    return hasValidMaleAbsences && hasValidFemaleAbsences && hasValidAge;
                })
                .map(item => ({
                    MaleAbsences: item.MaleAbsences,
                    FemaleAbsences: item.FemaleAbsences,
                    Age: item.Age
                }))

            const ageGroups = {}

            HandleFieldsStudyTimeWeeklyByAgeGroup.forEach(item => {
                if (item.Age && item.MaleAbsences && item.FemaleAbsences) {
                    if (!ageGroups[item.Age]) {
                        ageGroups[item.Age] = {
                            age: item.Age,
                            totalMAbsences: 0,
                            totalFAbsences: 0,
                            countM: 0,
                            countF: 0
                        };
                    }
                    ageGroups[item.Age].totalMAbsences += item.MaleAbsences;
                    ageGroups[item.Age].totalFAbsences += item.FemaleAbsences;
                    ageGroups[item.Age].countM += 1;
                    ageGroups[item.Age].countF += 1;
                } else {
                    console.error("Invalid item found in HandleFieldsAbsencesByAgeGroup:", item);
                }
            })

            const result = Object.keys(ageGroups).map(linechart => ({
                linechart,
                'Male': parseFloat((ageGroups[linechart].totalMAbsences / ageGroups[linechart].countM).toFixed(2)),
                'Female': parseFloat((ageGroups[linechart].totalFAbsences / ageGroups[linechart].countF).toFixed(2))
            }))

            return result

        }

        // ----------------------  StudyTimeWeekly By ParentalEducation

        const CalculateMaleAverageStudyTimeWeeklyByParentalEducation = () => {
            const HandleFieldsStudyTimeWeeklyByParentalEducation = data
                .filter(item => {
                    const hasValidMaleStudyTimeWeekly = item.MaleStudyTimeWeekly !== null && item.MaleStudyTimeWeekly !== undefined
                    const hasValidParentalEducation = item.ParentalEducation !== null && item.ParentalEducation !== undefined

                    return hasValidMaleStudyTimeWeekly && hasValidParentalEducation;
                })
                .map(item => ({
                    MaleStudyTimeWeekly: item.MaleStudyTimeWeekly,
                    ParentalEducation: item.ParentalEducation
                }))

            const ParentalEducationGroups = {}

            HandleFieldsStudyTimeWeeklyByParentalEducation.forEach(item => {
                if (item.ParentalEducation && item.MaleStudyTimeWeekly) {
                    if (!ParentalEducationGroups[item.ParentalEducation]) {
                        ParentalEducationGroups[item.ParentalEducation] = {
                            category: item.ParentalEducation,
                            totalStudyTimeWeekly: 0,
                            count: 0
                        };
                    }
                    ParentalEducationGroups[item.ParentalEducation].totalStudyTimeWeekly += item.MaleStudyTimeWeekly;
                    ParentalEducationGroups[item.ParentalEducation].count += 1
                } else {
                    console.error("Invalid item found in HandleFieldsStudyTimeWeeklyByParentalEducation:", item);
                }
            })

            const result = Object.keys(ParentalEducationGroups).map(category => ({
                category,
                'Male': parseFloat((ParentalEducationGroups[category].totalStudyTimeWeekly / ParentalEducationGroups[category].count).toFixed(2))
            }))

            return result

        }

        const CalculateFemaleAverageAbsencesByParentalEducation = () => {
            const HandleFieldsStudyTimeWeeklyByParentalEducation = data
                .filter(item => {
                    const hasValidFemaleStudyTimeWeekly = item.FemaleStudyTimeWeekly !== null && item.FemaleStudyTimeWeekly !== undefined
                    const hasValidParentalEducation = item.ParentalEducation !== null && item.ParentalEducation !== undefined

                    return hasValidFemaleStudyTimeWeekly && hasValidParentalEducation;
                })
                .map(item => ({
                    FemaleStudyTimeWeekly: item.FemaleStudyTimeWeekly,
                    ParentalEducation: item.ParentalEducation
                }))

            const ParentalEducationGroups = {}

            HandleFieldsStudyTimeWeeklyByParentalEducation.forEach(item => {
                if (item.ParentalEducation && item.FemaleStudyTimeWeekly) {
                    if (!ParentalEducationGroups[item.ParentalEducation]) {
                        ParentalEducationGroups[item.ParentalEducation] = {
                            category: item.ParentalEducation,
                            totalStudyTimeWeekly: 0,
                            count: 0
                        };
                    }
                    ParentalEducationGroups[item.ParentalEducation].totalStudyTimeWeekly += item.FemaleStudyTimeWeekly;
                    ParentalEducationGroups[item.ParentalEducation].count += 1;
                } else {
                    console.error("Invalid item found in HandleFieldsStudyTimeWeeklyByParentalEducation:", item);
                }
            })

            const result = Object.keys(ParentalEducationGroups).map(category => ({
                category,
                'Female': parseFloat((ParentalEducationGroups[category].totalStudyTimeWeekly / ParentalEducationGroups[category].count).toFixed(2))
            }))

            return result

        }

        // -------------------- AbsencesByParentalSupport

        const CalculateGenderAverageAbsencesByParentalSupport = () => {
            const HandleFieldsAbsencesByParentalSupport = data
                .filter(item => {
                    const hasValidMaleAbsences = item.MaleAbsences !== null && item.MaleAbsences !== undefined
                    const hasValidFemaleAbsences = item.FemaleAbsences !== null && item.FemaleAbsences !== undefined
                    const hasValidParentalSupport = item.ParentalSupport !== null && item.ParentalSupport !== undefined

                    return hasValidMaleAbsences && hasValidFemaleAbsences && hasValidParentalSupport;
                })
                .map(item => ({
                    MaleAbsences: item.MaleAbsences,
                    FemaleAbsences: item.FemaleAbsences,
                    ParentalSupport: item.ParentalSupport
                }))

            const ParentalSupportGroups = {}

            HandleFieldsAbsencesByParentalSupport.forEach(item => {
                if (item.ParentalSupport && item.MaleAbsences && item.FemaleAbsences) {
                    if (!ParentalSupportGroups[item.ParentalSupport]) {
                        ParentalSupportGroups[item.ParentalSupport] = {
                            age: item.ParentalSupport,
                            totalMParentalSupport: 0,
                            totalFParentalSupport: 0,
                            countM: 0,
                            countF: 0
                        }
                    }
                    ParentalSupportGroups[item.ParentalSupport].totalMParentalSupport += item.MaleAbsences;
                    ParentalSupportGroups[item.ParentalSupport].totalFParentalSupport += item.FemaleAbsences;
                    ParentalSupportGroups[item.ParentalSupport].countM += 1;
                    ParentalSupportGroups[item.ParentalSupport].countF += 1;
                } else {
                    console.error("Invalid item found in HandleFieldsAbsencesByParentalSupport:", item);
                }
            })

            const result = Object.keys(ParentalSupportGroups).map(linechart => ({
                linechart,
                'Male': parseFloat((ParentalSupportGroups[linechart].totalMParentalSupport / ParentalSupportGroups[linechart].countM).toFixed(2)),
                'Female': parseFloat((ParentalSupportGroups[linechart].totalFParentalSupport / ParentalSupportGroups[linechart].countF).toFixed(2))
            }))

            return result

        }

        // ---------------------------------------------------------------------------------------

        return {
            avgGpaMale: CalculateAvgGpaMale(),
            avgGpaFemale: CalculateAvgGpaFemale(),
            avgAbsencesMale: CalculateAvgAbsencesMale(),
            avgAbsencesFemale: CalculateAvgAbsencesFemale(),
            GenderAverageGpaByAgeGroup: CalculateGenderAverageGpaByAgeGroup(),
            GenderAverageStudyTimeWeeklyByAgeGroup: CalculateGenderAverageStudyTimeWeeklyByAgeGroup(),
            GenderAverageAbsencesByAgeGroup: CalculateGenderAverageAbsencesByAgeGroup(),
            MaleAverageStudyTimeWeeklyByParentalEducation: CalculateMaleAverageStudyTimeWeeklyByParentalEducation(),
            FemaleAverageStudyTimeWeeklyByParentalEducation: CalculateFemaleAverageAbsencesByParentalEducation(),
            GenderAverageAbsencesByParentalSupport: CalculateGenderAverageAbsencesByParentalSupport()
        }
    }

    return (
        <div className="dashboard" ref={pdfRef}>
            <div className="summary-cards">

                <div
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>

                    <SummaryCard title="Average GPA (Male)" value={processedData.avgGpaMale} />
                </div>
                <div
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>

                    <SummaryCard title="Average GPA (Female)" value={processedData.avgGpaFemale} />
                </div>
                <div
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>

                    <SummaryCard title="Average Absences (Male)" value={processedData.avgAbsencesMale} />
                </div>
                <div
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>

                    <SummaryCard title="Average Absences (Female)" value={processedData.avgAbsencesFemale} />
                </div>

            </div>

            <div className="charts">
                <div
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>

                    <BarChart data={processedData.GenderAverageGpaByAgeGroup} title="Average GPA By Age Group" />
                </div>

                <div
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>

                    <LineChart data={processedData.GenderAverageStudyTimeWeeklyByAgeGroup} title="Average Study Time Weekly By Age Group" />
                </div>

                <div
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>

                    <LineChart data={processedData.GenderAverageAbsencesByAgeGroup} title="Average Absences By Age Group" />
                </div>

                <div
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>

                    <PieChartM data={processedData.MaleAverageStudyTimeWeeklyByParentalEducation} title="Male Average Study Time Weekly By Parental Education Level" />

                </div>

                <div
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>

                    <PieChartF data={processedData.FemaleAverageStudyTimeWeeklyByParentalEducation} title="Female Average Study Time Weekly By Parental Education Level" />
                </div>

                <div
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>

                    <LineChart data={processedData.GenderAverageAbsencesByParentalSupport} title="Average Absences By Level of Parental Support" />
                </div>

            </div>

            <h4>
                Click below to download this dashboard
            </h4>
            <button

                style={{
                    padding: "10px",
                    fontSize: "1rem",
                    color: "#fff",
                    background: "#00bfff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    boxShadow: "0px 8px 10px rgb(255, 255, 255)",
                    transition: "transform 0.2s",
                    margin: "10px"
                }}

                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}

                onClick={downloadPDF}>
                Download PDF
            </button>

        </div>
    )
}

export default Dashboard