class Patient {
    static all = []
    static allUnassigned = []
    
    constructor(id, firstName, lastName){
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.fullName = `${firstName} ${lastName}`
        Patient.all.push(this)
    }

    static saveUnassignedPatients(){
        const unassignedPatientList = document.getElementById("patients")
        Patient.allUnassigned = []

        for (const patient of unassignedPatientList.children){
            for (const child of patient.children){
                for (const p of child.children){
                    if (Patient.all.find(pt => pt.id === parseInt(p.dataset.patientId))){
                        const patientObj = Patient.all.find(pt => pt.id === parseInt(p.dataset.patientId))
                    Patient.allUnassigned.push(patientObj)}
                }
            }
        }

    }

    
}