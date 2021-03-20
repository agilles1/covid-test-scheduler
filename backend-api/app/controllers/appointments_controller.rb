class AppointmentsController < ApplicationController

    def index 
        appointments = Appointment.by_time

        render json: appointments
    end

    def create
        binding.pry
    end

end
