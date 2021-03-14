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
            const aptSlot = document.createElement('li')
            aptSlot.setAttribute("id", `patient-slot-${patient.id}`)
            const aptSpace = document.createElement('div')
            aptSpace.setAttribute("id", `patient-${patient.id}`)
            this.bindDragDrop(aptSlot)
            this.bindDragDrop(aptSpace)
            aptSpace.innerHTML = `${patient.fullName}`
            aptSlot.appendChild(aptSpace)
            timeSlot.appendChild(aptSlot)
        });
        aptHeader.insertAdjacentElement("afterend", timeSlot)
        
    }

    insertBlankDivs(apt){
    const timeSlot = document.getElementById(`${apt.id}`)
        for (let index = apt.patients.length; index < apt.maxTests; index++) {
            const aptSpace = document.createElement('li')
            aptSpace.setAttribute("id", `empty-${apt.id}-${index}`)
            aptSpace.setAttribute("class", "appointment-time")
            aptSpace.setAttribute("draggable", "true")
            this.bindDragDrop(aptSpace)
            timeSlot.appendChild(aptSpace)
        }
    }

    renderUnassignedPatients(){
        const col = document.getElementById('patients')
        const patientList = document.createElement("ul")
            Patient.allUnassigned.forEach(patient => {
                console.log(patient)
                const p = document.createElement("div")
                p.setAttribute("id", patient.id)
                p.innerHTML = patient.fullName
                patientList.appendChild(p)
                this.bindDragDrop(p)       
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
        //If there is already a Patient assigned to this slot don't permit 
        if (ev.target.innerHTML !=  "") {
            return false;
        } else {
        const data = ev.dataTransfer.getData("text");
        ev.target.append(document.getElementById(data));}
      }

    bindDragDrop(el){
            el.setAttribute("draggable", "true")
            el.addEventListener("dragstart", evt => this.drag(evt))
            el.addEventListener("dragover", evt => this.allowDrop(evt))
            el.addEventListener("drop", evt => this.drop(evt))}
    }