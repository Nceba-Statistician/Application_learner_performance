import React, { useState, useEffect } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Box, Typography, Grid, Paper } from '@mui/material';

const New_Dashboard = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/items_processed")
      .then(response => response.json())
      .then(data => {
        setData(data)
        console.log(data)
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

 const { Age, GradeClass, ParentalEducation, ParentalSupport, Sports, Music, StudyTimeWeekly_Male, StudyTimeWeekly_Female, Absences_Male, Absences_Female, GPA_Male, GPA_Female } = data;
 
  const StudyTimeWeekly_Male_ByAgeData = {
    labels: Age.labels,
    datasets: [
      {
        label: 'StudyTimeWeekly Male by Age Group',
        data: StudyTimeWeekly_Male.values,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const StudyTimeWeekly_Female_ByAgeData = {
    labels: Age.labels,
    datasets: [
      {
        label: 'StudyTimeWeekly Female by Age Group',
        data: StudyTimeWeekly_Female.values,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const GradeClassByAbsences_Male = {
    labels: GradeClass.labels,
    datasets: [
      {
        label: 'Attrition by Years at Company',
        data: Absences_Male.values,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        fill: true,
      },
    ],
  };

  const GradeClassByAbsences_Female = {
    labels: GradeClass.labels,
    datasets: [
      {
        label: 'Attrition by Years at Company',
        data: Absences_Female.values,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        fill: true,
      },
    ],
  };

  const ParentalSupportByGPA_Male = {
    labels: ParentalSupport.labels,
    datasets: [
      {
        label: 'Male_GPA_By_ParentalSupport',
        data: GPA_Male.values,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const ParentalSupportByGPA_Female = {
    labels: ParentalSupport.labels,
    datasets: [
      {
        label: 'Female_GPA_By_ParentalSupport',
        data: GPA_Female.values,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const ParentalEducationByGPA_Male = {
    labels: ParentalEducation.labels,
    datasets: [
      {
        label: 'Male_GPA_By_ParentalEducation',
        data: GPA_Male.values,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const ParentalEducationByGPA_Female = {
    labels: ParentalEducation.labels,
    datasets: [
      {
        label: 'Female_GPA_By_ParentalEducation',
        data: GPA_Female.values,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };
  
  const Sports_Male = {
    labels: Sports.labels,
    datasets: [
      {
        label: 'Sports_By_MaleGPA',
        data: GPA_Male.values,
        backgroundColor: [
          '#FF6384', 
          '#36A2EB', 
          '#FFCE56', 
          '#4BC0C0', 
          '#9966FF', 
          '#FF9F40'
        ],
      },
    ],
  };

  const Sports_Female = {
    labels: Sports.labels,
    datasets: [
      {
        label: 'Sports_By_FemaleGPA',
        data: GPA_Female.values,
        backgroundColor: [
          '#FF6384', 
          '#36A2EB', 
          '#FFCE56', 
          '#4BC0C0', 
          '#9966FF', 
          '#FF9F40'
        ],
      },
    ],
  };


  const Music_Male = {
    labels: Music.labels,
    datasets: [
      {
        label: 'Music_By_MaleGPA',
        data: GPA_Male.values,
        backgroundColor: [
          '#FF6384', 
          '#36A2EB', 
          '#FFCE56', 
          '#4BC0C0', 
          '#9966FF', 
          '#FF9F40'
        ],
      },
    ],
  };

  const Music_Female = {
    labels: Music.labels,
    datasets: [
      {
        label: 'Music_By_FemaleGPA',
        data: GPA_Female.values,
        backgroundColor: [
          '#FF6384', 
          '#36A2EB', 
          '#FFCE56', 
          '#4BC0C0', 
          '#9966FF', 
          '#FF9F40'
        ],
      },
    ],
  };


  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">HR Analytics Dashboard</Typography>
        </Grid>

        <Grid item xs={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Average GPA</Typography>
            <Typography variant="h4">{GPA_Male}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Average GPA</Typography>
            <Typography variant="h4">{GPA_Female}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Average StudyTimeWeekly Male</Typography>
            <Typography variant="h4">{StudyTimeWeekly_Male}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Average StudyTimeWeekly Female</Typography>
            <Typography variant="h4">{StudyTimeWeekly_Female}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Average Absences Male</Typography>
            <Typography variant="h4">{Absences_Male}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Average Absences Female</Typography>
            <Typography variant="h4">{Absences_Female}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper sx={{ padding: 2 }}>
            <Bar data={StudyTimeWeekly_Male_ByAgeData} />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper sx={{ padding: 2 }}>
            <Bar data={StudyTimeWeekly_Female_ByAgeData} />
          </Paper>
        </Grid>
        
        <Grid item xs={6}>
          <Paper sx={{ padding: 2 }}>
            <Doughnut data={Sports_Male} />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper sx={{ padding: 2 }}>
            <Doughnut data={Sports_Female} />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper sx={{ padding: 2 }}>
            <Doughnut data={Music_Male} />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper sx={{ padding: 2 }}>
            <Doughnut data={Music_Female} />
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Line data={GradeClassByAbsences_Male} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Line data={GradeClassByAbsences_Female} />
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Bar data={ParentalSupportByGPA_Male} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Bar data={ParentalSupportByGPA_Female} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Bar data={ParentalEducationByGPA_Male} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Bar data={ParentalEducationByGPA_Female} />
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
};

export default New_Dashboard;

// npm install @mui/material @emotion/react @emotion/styled
