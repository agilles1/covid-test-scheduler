class Appointment {
    static all = []
    static all_dates = []

    constructor(id, time, duration, max_tests){
        this.id = id;
        this.time = new Date(time);
        this.duration = duration;
        this.max_tests = max_tests
        //Create array of all testing days 
        if (Appointment.all_dates.includes(this.time.toISOString().substring(0, 10)) == false){
            Appointment.all_dates.push(this.time.toISOString().substring(0, 10))
        }          
        //Create array of all testing appointments with times  
        Appointment.all.push(this)
    }

    




}