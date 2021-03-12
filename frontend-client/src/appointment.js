class Appointment {
    static all = []
    static all_dates = []

    constructor(id, time, duration, max_tests){
        this.id = id;
        this.time = time;
        this.duration = duration;
        this.max_tests = max_tests
        //Create array of all testing days 
        if (Appointment.all_dates.includes(this.time.substring(0, 10)) == false){
            Appointment.all_dates.push(this.time.substring(0, 10))
        }          
        //Create array of all testing appointments with times  
        Appointment.all.push(this)
    }

    




}