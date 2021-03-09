class AppointmentSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :patient
  belongs_to :test_time

  

end
