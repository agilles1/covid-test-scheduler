const app = new AppContainer
const saveButton = document.getElementById("create-new-apt-btn")
const addPatient = document.getElementById("random-assign-btn")

app.getTestTimes()
app.getUnassignedPatients()
saveButton.addEventListener("click", (event) => 
  app.postNewAppointment(event))

addPatient.addEventListener("click", (event) =>
  app.randomAssignPatient(event))
