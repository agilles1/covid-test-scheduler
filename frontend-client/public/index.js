const app = new AppContainer
const saveButton = document.getElementById("save-btn")

app.getTestTimes()
app.getUnassignedPatients()
// saveButton.addEventListener("click", function() {
//     const schedule = document.getElementById("appointments")
    
//     for (item of schedule.children) { 
//         if (!item.id.includes("header")) {
//             const aptObj = Appointment.all.find(apt => apt.id === parseInt(item.id))
//             aptObj.patients = []
//             for (p of item.children){
//                 for (e of p.children){
//                     if (Patient.all.find(pt => pt.id === parseInt(e.dataset.patientId))){
//                         aptObj.patients.push(Patient.all.find(pt => pt.id === parseInt(p.children[0].dataset.patientId)))
//                         if (Patient.allUnassigned.findIndex(pat => pat.id === parseInt(p.children[0].dataset.patientId)) >= 0){
//                             Patient.allUnassigned.splice(Patient.allUnassigned.findIndex(pat => pat.id === parseInt(p.children[0].dataset.patientId),1), 1)
//                         }
//                     }
//                 }
//             }
            
//         } 
//     }
// })
