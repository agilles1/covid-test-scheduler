const app = new AppContainer
const saveButton = document.getElementById("create-new-apt-btn")

app.getTestTimes()
app.getUnassignedPatients()
saveButton.addEventListener("click", (event) => 
  app.postNewAppointment(event))
