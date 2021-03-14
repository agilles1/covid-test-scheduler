class PatientsController < ApplicationController

    def index
        patients = Patient.all_unassigned
        render json: patients
    end
end
