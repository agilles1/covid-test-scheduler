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

    getUnassignedPatients(){
        fetch(`${this.url}/patients`)
        .then(res => res.json())
        .then(data => data.forEach(patient => {
            const newPatient = new Patient(patient.id, patient.first_name, patient.last_name)
            Patient.allUnassigned.push(newPatient)
        }))
        .then(patient => this.renderUnassignedPatients())
    }

    renderTestTimes(){
        const col = document.getElementById('appointments')
            Appointment.all.forEach(apt => {
                const aptHeader = document.createElement('h3')
                aptHeader.setAttribute("id", `header-${apt.id}`)
                aptHeader.setAttribute("class", "appointment-time-header")
                aptHeader.innerHTML = apt.time
                col.appendChild(aptHeader)
                // aptHeader.insertAdjacentElement("afterend", aptDiv)
                this.insertScheduledPatientUl(aptHeader, apt)
                this.insertBlankDivs(apt)
            });   
    }

    insertScheduledPatientUl(aptHeader, apt){
        const timeSlot = document.createElement('ul')
        timeSlot.setAttribute("id", `${apt.id}`)
        apt.patients.forEach(patient => {
            const aptSpace = document.createElement('li')
            aptSpace.setAttribute("id", `patient-${patient.id}`)
            aptSpace.setAttribute("draggable", "true")
            aptSpace.addEventListener("dragstart", evt => this.drag(evt))
            aptSpace.addEventListener("dragover", evt => this.allowDrop(evt))
            aptSpace.addEventListener("drop", evt => this.drop(evt))
            aptSpace.innerHTML = `${patient.fullName}`
            timeSlot.appendChild(aptSpace)
        });
        aptHeader.insertAdjacentElement("afterend", timeSlot)
        
    }

    insertBlankDivs(apt){
    const timeSlot = document.getElementById(`${apt.id}`)
        for (let index = apt.patients.length; index < apt.maxTests; index++) {
            const aptSpace = document.createElement('li')
            aptSpace.setAttribute("id", `empty-${index}`)
            aptSpace.setAttribute("class", "appointment-time")
            aptSpace.setAttribute("draggable", "true")
            aptSpace.addEventListener("dragstart", evt => this.drag(evt))
            aptSpace.addEventListener("dragover", evt => this.allowDrop(evt))
            aptSpace.addEventListener("drop", evt => this.drop(evt))
            timeSlot.appendChild(aptSpace)
        }
    }

    renderUnassignedPatients(){
        const col = document.getElementById('patients')
        const patientList = document.createElement("ul")
            Patient.allUnassigned.forEach(patient => {
                console.log(patient)
                const p = document.createElement("li")
                p.innerHTML = patient.fullName
                patientList.appendChild(p)
                console.log(p)           
            })
            col.appendChild(patientList)
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

    }