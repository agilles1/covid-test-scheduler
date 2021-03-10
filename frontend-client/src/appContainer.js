class AppContainer {
    url = "http://localhost:3000"
    appointments = []
    patients = []

    getTestTimes(){
        fetch(`${this.url}/test_times`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    // .then(data => renderTestTimes(data))


    // renderTestTimes(){
    //     const table = document.getElementById('appointment-table')
    //         data.forEach(apt => {
    //             const row = table.insertRow()
    //             addBlanks(apt)
    //             const cell = row.insertCell()
    //             cell.innerHTML = `<div>${apt.time}</div>` //Add Test_Time id
    //         });   
    // }


 



    // function createAppointments(data){
    //     data.forEach(apt => {
    //         console.log(apt)
    //         appointment = new Appointment()
            
    //     });
    // }

}