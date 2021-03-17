class AppContainer {
    url = "http://localhost:3000"
    
    getTestTimes(){
        fetch(`${this.url}/test_times`)
        .then(res => res.json())
        .then(data => data.forEach(apt => {
            const appointment = new Appointment(apt.id, apt.time, apt.duration, apt.max_tests, apt.location);
                apt.patients.forEach(patient => {
                    const newPatient = new Patient(patient.id, patient.first_name, patient.last_name)
                    appointment.patients.push(newPatient)
            });
        }))
        .then(apt => {
            this.renderAppointmentInfo()
            this.bindSelector()
            this.renderTestTimes(document.getElementById("date-select").value)
            })
    }

    postTestTimes(){
        fetch()
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

    renderTestTimes(date){
        const col = document.getElementById('appointments')
        col.innerHTML =""
            Appointment.all.filter(apt => apt.date == date).forEach(apt => {
                const aptHeader = document.createElement('h3')
                aptHeader.setAttribute("id", `header-${apt.id}`)
                aptHeader.setAttribute("class", "font-semibold")
                aptHeader.innerHTML = apt.time
                col.appendChild(aptHeader)
                this.insertScheduledPatientUl(aptHeader, apt)
                this.insertBlankDivs(apt)
            });
    }

    renderAppointmentInfo(){
        const col = document.getElementById('appointment-info')
        const info = document.createElement("div")
        const appointmentSelect = document.createElement("SELECT")
        appointmentSelect.setAttribute("id", "date-select")
        Appointment.allDates.forEach(date => {
            const option = document.createElement("option")
            option.value = date
            option.text = date
            appointmentSelect.appendChild(option)
        });
        info.appendChild(appointmentSelect)
        col.appendChild(info)
    }

    insertScheduledPatientUl(aptHeader, apt){
        const timeSlot = document.createElement('ul')
        timeSlot.setAttribute("id", `${apt.id}`)
        apt.patients.forEach(patient => {
            const aptSlot = document.createElement('li')
            aptSlot.setAttribute("id", `patient-slot-${patient.id}`)
            const aptPatient = document.createElement('div')
            aptPatient.setAttribute("class", "border-solid")
            aptPatient.setAttribute("id", `patient-${patient.id}`)
            this.bindDragDrop(aptSlot)
            this.bindDragDrop(aptPatient)
            aptPatient.innerHTML = `${patient.fullName}`
            aptSlot.appendChild(aptPatient)
            timeSlot.appendChild(aptSlot)
        });
        aptHeader.insertAdjacentElement("afterend", timeSlot)
        
    }

    insertBlankDivs(apt){
    const timeSlot = document.getElementById(`${apt.id}`)
        for (let index = apt.patients.length; index < apt.maxTests; index++) {
            const aptSpace = document.createElement('li')
            aptSpace.setAttribute("id", `empty-${apt.id}-${index}`)
            aptSpace.setAttribute("class", "leading-normal")
            aptSpace.setAttribute("draggable", "true")
            aptSpace.innerHTML = "<br>"
            this.bindDragDrop(aptSpace)
            timeSlot.appendChild(aptSpace)
        }
    }

    renderUnassignedPatients(){
        const col = document.getElementById('patients')
        const patientList = document.createElement("ul")
            Patient.allUnassigned.forEach(patient => {
                const patientSlot = document.createElement("li")
                patientSlot.setAttribute("id", `unassigned-${patient.id}`)
                const p = document.createElement("div")
                p.setAttribute("id", patient.id)
                p.innerHTML = patient.fullName
                patientSlot.appendChild(p)
                patientList.appendChild(patientSlot)
                col.appendChild(patientList)
                this.bindDragDrop(patientSlot)
                this.bindDragDrop(p)       
            })
            this.bindDragDrop(patientList)
            col.appendChild(patientList)
    }

    allowDrop(ev) {
        ev.preventDefault();
      }
      
    drag(ev) {
        const obj = {elementId: `${ev.target.id}`, parentElementId: `${ev.target.parentElement.id}`}
        ev.dataTransfer.setData("text/plain", JSON.stringify(obj));
    }
      
    drop(ev) {
        ev.preventDefault();
        
        const data = ev.dataTransfer.getData("text/plain")
        const parsedData = JSON.parse(data)
        const draggedEl = document.getElementById(parsedData.elementId)
        const elDraggedFrom = document.getElementById(parsedData.parentElementId)
        //ifpatient is already in the same slot don't move
       
      if (ev.target.innerHTML !=  "" && ev.target.parentElement === draggedEl.parentElement.parentElement ) {
        return false;
        } 
        //if the space is blank drop 
        else if (ev.target.innerHTML ===  "<br>") {
            ev.target.append(draggedEl);
            ev.target.innerHTML = ev.target.innerHTML.substring(4)
            elDraggedFrom.innerHTML = "<br>"
        }
        //If there is already a Patient assigned to this slot don't permit 
        else if (ev.target.innerHTML !=  ""){
            return false
        }
      }

    bindDragDrop(el){
            el.setAttribute("draggable", "true")
            el.addEventListener("dragstart", evt => this.drag(evt))
            el.addEventListener("dragover", evt => this.allowDrop(evt))
            el.addEventListener("drop", evt => this.drop(evt))
        }
    
    bindSelector(){
        const dateSelector = document.getElementById("date-select")
        console.log(dateSelector)
        dateSelector.addEventListener("change", (event) => {
            const date = event.target.value
            this.renderTestTimes(date)
        })
    }
    }