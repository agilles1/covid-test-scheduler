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
        const col = document.getElementById('appointments')
            Appointment.all.forEach(apt => {
                console.log(col)
                const aptDiv = document.createElement('div')
                aptDiv.setAttribute("id", `${apt.id}`)
                aptDiv.innerHTML = apt.time
                col.appendChild(aptDiv)
                this.insertBlankDivs(col, apt)
            });   
    }

    insertBlankDivs(aptDiv, apt){
        for (let index = 0; index < apt.max_tests; index++) {
            const aptSpace = document.createElement('div')
            aptSpace.setAttribute("id", `${apt.id}-${index}`)
            aptSpace.innerHTML = "<br>"
            aptDiv.appendChild(aptSpace)
        }
    }


 



    // function createAppointments(data){
    //     data.forEach(apt => {
    //         console.log(apt)
    //         appointment = new Appointment()
            
    //     });
    // }

}