import tkinter as tk
import requests

def get_prediction():
    url = "http://127.0.0.1:8001/predictions"
    params = {
        "Gender": int(gender_var.get()),
        "StudyTimeWeekly": float(study_time_var.get()),
        "Absences": int(absences_var.get()),
        "Tutoring": int(tutoring_var.get()),
        "ParentalSupport": int(parental_support_var.get()),
        "Extracurricular": int(extracurricular_var.get()),
        "Sports": int(sports_var.get()),
        "Music": int(music_var.get()),
        "GradeClass": int(grade_class_var.get())
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raises HTTPError for bad responses
        result = response.json()
        result_label.config(text=result[0])
    except requests.RequestException as e:
        result_label.config(text=f"Error: {e}")

# Create the main window
root = tk.Tk()
root.title("GPA Prediction")

# Define variables
gender_var = tk.StringVar(value="1")
study_time_var = tk.StringVar(value="12")
absences_var = tk.StringVar(value="2")
tutoring_var = tk.StringVar(value="1")
parental_support_var = tk.StringVar(value="2")
extracurricular_var = tk.StringVar(value="1")
sports_var = tk.StringVar(value="0")
music_var = tk.StringVar(value="0")
grade_class_var = tk.StringVar(value="3")

# Create and place widgets
tk.Label(root, text="Gender (1 for true, 0 for false)").pack()
tk.Entry(root, textvariable=gender_var).pack()

tk.Label(root, text="Study Time Weekly").pack()
tk.Entry(root, textvariable=study_time_var).pack()

tk.Label(root, text="Absences").pack()
tk.Entry(root, textvariable=absences_var).pack()

tk.Label(root, text="Tutoring (1 for true, 0 for false)").pack()
tk.Entry(root, textvariable=tutoring_var).pack()

tk.Label(root, text="Parental Support").pack()
tk.Entry(root, textvariable=parental_support_var).pack()

tk.Label(root, text="Extracurricular (1 for true, 0 for false)").pack()
tk.Entry(root, textvariable=extracurricular_var).pack()

tk.Label(root, text="Sports (1 for true, 0 for false)").pack()
tk.Entry(root, textvariable=sports_var).pack()

tk.Label(root, text="Music (1 for true, 0 for false)").pack()
tk.Entry(root, textvariable=music_var).pack()

tk.Label(root, text="Grade Class").pack()
tk.Entry(root, textvariable=grade_class_var).pack()

tk.Button(root, text="Get Prediction", command=get_prediction).pack()

result_label = tk.Label(root, text="")
result_label.pack()

# Run the application
root.mainloop()
