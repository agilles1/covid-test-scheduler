class AppContainer {
    url = "http://localhost:3000"
    
    getTestTimes(){
        fetch(`${this.url}/test_times`)
        .then(res => res.json())
        .then(data => data.forEach(apt => {
            new Appointment(apt.id, apt.time, apt.duration, apt.max_tests);
        }))
        .then(apt => this.renderTestTimes())
    }

    renderTestTimes(){
        const table = document.getElementById('appointment-table')
            Appointment.all.forEach(apt => {
                const row = table.insertRow()
                const cell = row.insertCell()
                cell.innerHTML = `<div>${apt.time}</div>` //Add Test_Time id
            });   
    }


 



    // function createAppointments(data){
    //     data.forEach(apt => {
    //         console.log(apt)
    //         appointment = new Appointment()
            
    //     });
    // }

}