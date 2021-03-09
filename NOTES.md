COVID TEST SCHEDULER

[] Models 
    TestAppointment
        ID
        Date:date
        Start:time
        End:time 
        MaxTests:integer
        
    Patient 
        ID
        FirstName:string
        LastName:string
        Email:string
        JobTitle:string

    TestAppointmentPatients
        ID
        belongs_to: Appointment
        belongs_to: Patient


