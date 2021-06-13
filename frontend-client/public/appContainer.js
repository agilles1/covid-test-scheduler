//Responsible for backend calls and rendering
class AppContainer {
    url = "http://localhost:3000"
    
    getTestTimes(){
        fetch(`${this.url}/test_times`)
        .then(res => res.json())
        .then(data => Appointment.createAppointmentsFromData(data))
        .then(apt => {
            this.renderAppointmentInfo()
            this.bindSelector()
            this.renderTestTimes(document.getElementById("date-select").value)
            })
        }

    getUnassignedPatients(){
        fetch(`${this.url}/patients`)
        .then(res => res.json())
        .then(Patient.allUnassigned = [])
        .then(data => 
            data.forEach(patient => {
            const newPatient = new Patient(patient.id, patient.first_name, patient.last_name)
            Patient.allUnassigned.push(newPatient)
        }))
        .then(patient => 
            this.renderUnassignedPatients())
    }

    insertScheduledPatientUl(aptHeader, apt){
        const timeSlot = document.createElement('ul')
        timeSlot.setAttribute("id", `${apt.id}`)
        apt.patients.forEach(patient => {
            const aptSlot = document.createElement('li')
            aptSlot.setAttribute("id", `patient-slot-${patient.id}`)
            const aptPatient = document.createElement('div')
            aptPatient.dataset.patientId = patient.id
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

    postNewAppointment(event){
        const myForm = event.target.form
        event.preventDefault()
        if (this.checkForm(myForm)) {
            fetch(`${this.url}/test_times`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(
                    {appointment: {
                    date: myForm.test_date.value,
                    start: myForm.start_time.value, 
                    end: myForm.end_time.value,
                    max_tests: myForm.test_per_apt.value
                }})
            })
            .then(resp => resp.json())
            //Clear local db for repopulating to avoid duplications
            .then(
                Appointment.all = [],
                Appointment.allDates = [],
                Patient.all = [])
            .then(data => Appointment.createAppointmentsFromData(data))
            .then(apt => {
                this.getUnassignedPatients()
                this.updateAppointmentInfo()
                this.bindSelector()
                this.updateTestTimes(document.getElementById("date-select").value)
                })
        } else {  
            alert("One or more fields are empty! Please try again.")   
        }
    }

    renderAppointmentInfo(){
        const col = document.getElementById('appointment-info')
        const info = document.createElement("div")
        info.setAttribute("id", "selector-div")
        const appointmentSelect = document.createElement("SELECT")
        appointmentSelect.setAttribute("id", "date-select")
        Appointment.allDates.sort().forEach(date => {
            const option = document.createElement("option")
            option.value = date
            option.text = date
            appointmentSelect.appendChild(option)
        });
        info.appendChild(appointmentSelect)
        col.appendChild(info)
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

    renderUnassignedPatients(){
        const col = document.getElementById('patients')
        col.innerHTML = ""
        const patientList = document.createElement("ul")
            Patient.allUnassigned.forEach(patient => {
                const patientSlot = document.createElement("li")
                patientSlot.setAttribute("id", `unassigned-${patient.id}`)
                const p = document.createElement("div")
                p.dataset.patientId = patient.id
                p.setAttribute("id", `patient-id-${patient.id}`)
                p.innerHTML = patient.fullName
                patientSlot.appendChild(p)
                patientList.appendChild(patientSlot)
                col.appendChild(patientList)
                this.bindDragDrop(patientSlot)
                this.bindDragDrop(p)       
            })
            this.bindDragDrop(patientList)
            col.appendChild(patientList)
            const blankSlot = document.createElement("li")
            blankSlot.setAttribute("id", 'blank-patient')
            blankSlot.innerHTML="<br>"
            this.bindDragDrop(blankSlot)
            patientList.appendChild(blankSlot)
    }

    updateAppointmentInfo(){
        const col = document.getElementById('appointment-info')
        const info = document.getElementById('selector-div')
        const appointmentSelect = document.getElementById("date-select")
        appointmentSelect.innerHTML=""
        Appointment.allDates.sort().forEach(date => {
            const option = document.createElement("option")
            option.value = date
            option.text = date
            appointmentSelect.appendChild(option)
        });
        info.appendChild(appointmentSelect)
        col.appendChild(info)
    }

    updateTestTimes(date){
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

    randomAssignPatient(){
        
        const firstEmpty = document.getElementsByClassName("leading-normal")[0]
        const firstUnassignedPatient = Patient.allUnassigned[0]
        const aptPatient = document.createElement('div')
        aptPatient.dataset.patientId = firstUnassignedPatient.id
        aptPatient.setAttribute("id", `patient-${firstUnassignedPatient.id}`)
        aptPatient.innerText = `${firstUnassignedPatient.fullName}`
        firstEmpty.appendChild(aptPatient)
        
    }

    //HELPERS
    allowDrop(ev) {
        ev.preventDefault();
    }
    
    checkForm(form){
        if(form.test_date.value == "" || form.start_time.value == "" || form.end_time.value == "" || form.test_per_apt.value == "" ){
            return false
        } else {
            return true
        }
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
        //if patient is already in the same slot don't move
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
        dateSelector.addEventListener("change", (event) => {
            Appointment.saveAppointmentsWithPatients()
            Patient.saveUnassignedPatients()
            const date = event.target.value
            this.updateTestTimes(date)
            this.renderUnassignedPatients()
        })
    }


    

}