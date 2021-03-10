class Appointment {
    static all = []

    constructor(id, time, duration, max_tests){
        this.id = id;
        this.time = time;
        this.duration = duration;
        this.max_tests = max_tests
        Appointment.all.push(this)
    }




}