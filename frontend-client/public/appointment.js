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

    




}