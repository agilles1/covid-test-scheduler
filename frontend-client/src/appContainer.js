class AppContainer {
    url = "http://localhost:3000"
    
    getTestTimes(){
        fetch(`${this.url}/test_times`)
        .then(res => res.json())
        .then(data => data.forEach(apt => {
            const appointment = new Appointment(apt.id, apt.time, apt.duration, apt.max_tests);
                apt.patients.forEach(patient => {
                    const newPatient = new Patient(patient.id, patient.first_name, patient.last_name)
                    appointment.patients.push(newPatient)
            });
        }))
        .then(apt => this.renderTestTimes())
    }

    renderTestTimes(){
        const col = document.getElementById('appointments')
            Appointment.all.forEach(apt => {
                const aptDiv = document.createElement('p')
                aptDiv.setAttribute("id", `${apt.id}`)
                aptDiv.setAttribute("class", "appointment-time-header")
                aptDiv.innerHTML = apt.time
                col.appendChild(aptDiv)
                this.insertScheduledPatientDiv(col, apt)
            });   
    }

    insertScheduledPatientDiv(aptDiv, apt){
        apt.patients.forEach(patient => {
            const aptSpace = document.createElement('div')
            aptSpace.setAttribute("id", `${apt.id}`)
            aptSpace.setAttribute("class", "appointment-time")
            aptSpace.innerHTML = `${patient.fullName}`
            aptDiv.appendChild(aptSpace)
        });
    }

    insertBlankDivs(aptDiv, apt){
        for (let index = 0; index < apt.maxTests; index++) {
            const aptSpace = document.createElement('div')
            aptSpace.setAttribute("id", `${apt.id}-${index}`)
            aptSpace.setAttribute("class", "appointment-time")
            aptSpace.innerHTML = "<br>"
            aptDiv.appendChild(aptSpace)
        }
    }

    allowDrop(ev) {
        ev.preventDefault();
      }
      
    drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
      }
      
    drop(ev) {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
      }


 



    // function createAppointments(data){
    //     data.forEach(apt => {
    //         console.log(apt)
    //         appointment = new Appointment()
            
    //     });
    // }

}