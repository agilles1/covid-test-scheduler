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

    static createNewAppointment(event){
        debugger
        event.preventDefault()
        const myForm = event.target.form
        fetch(`${this.url}/appointments`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                date: myForm.test_date.value,
                start: myForm.start_time.value, 
                end: myForm.end_time.value,
                max_tests: myForm.test_per_apt.value
            })
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

}