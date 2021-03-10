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
                this.insertBlankRows(table, apt)
                const cell = row.insertCell()
                cell.innerHTML = `<div id = ${apt.id}>${apt.time}</div>` //Add Test_Time id
            });   
    }

    insertBlankRows(table, apt){
        for (let index = 0; index < apt.max_tests; index++) {
            const row = table.insertRow()     
            const cell = row.insertCell()
            cell.innerHTML = `<div id = ${apt.id}-${index}></div>`           
        }

    }


 



    // function createAppointments(data){
    //     data.forEach(apt => {
    //         console.log(apt)
    //         appointment = new Appointment()
            
    //     });
    // }

}