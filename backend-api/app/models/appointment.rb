class Appointment< ApplicationRecord
    belongs_to :patient
    belongs_to :test_time
    scope :by_time, -> {order(:test_time_id)}


end
