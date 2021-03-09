class Patient < ApplicationRecord
    has_many :appointments
    has_many :test_times, through: :appointments

    
end
