class Appointment {
    static all = []
    static allDates = []

    constructor(id, time, duration, maxTests, location){
        this.id = id;
        this.date = time.substring(0, 10)
        this.time = time.split("T")[1].substring(0,5)
        this.duration = duration;
        this.maxTests = maxTests;
        this.location = location;
        this.patients = []
        //Create array of all testing days 
        if (Appointment.allDates.includes(this.date) == false){
            Appointment.allDates.push(this.date)
        }          
        //Create array of all testing appointments with times  
        Appointment.all.push(this)
    }

    static saveAppointmentsWithPatients(){
        const schedule = document.getElementById("appointments")
   
        for (const item of schedule.children) { 
            if (!item.id.includes("header")) {
                const aptObj = Appointment.all.find(apt => apt.id === parseInt(item.id))
                aptObj.patients = []
                for (const p of item.children){
                    for (const e of p.children){
                        if (Patient.all.find(pt => pt.id === parseInt(e.dataset.patientId))){
                            aptObj.patients.push(Patient.all.find(pt => pt.id === parseInt(p.children[0].dataset.patientId)))
                        }
                    }
                }
                
            } 
        }
    }

    static createAppointmentsFromData(data){
        data.forEach(apt => {
            const appointment = new Appointment(apt.id, apt.time, apt.duration, apt.max_tests, apt.location);
                apt.patients.forEach(patient => {
                    const newPatient = new Patient(patient.id, patient.first_name, patient.last_name)
                    appointment.patients.push(newPatient)
            })
        })
    }

}