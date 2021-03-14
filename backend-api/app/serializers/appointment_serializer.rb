class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :test_time
  belongs_to :patient
  belongs_to :test_time

  

end
