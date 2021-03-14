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
}