class Patient {
    static all = []
    constructor(id, firstName, lastName){
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.fullName = `${firstName} ${lastName}`
        Patient.all.push(this)
    }
}