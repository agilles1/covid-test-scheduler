class Patient < ApplicationRecord
    has_many :appointments
    has_many :test_times, through: :appointments
    
    def self.all_unassigned
        all_unassigned = []
        Patient.all.each do |patient|
            if patient.appointments.count == 0
                all_unassigned.push(patient)
            end
        end
        all_unassigned
    end


    
end
