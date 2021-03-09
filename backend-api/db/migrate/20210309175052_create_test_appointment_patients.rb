class CreateTestAppointmentPatients < ActiveRecord::Migration[6.0]
  def change
    create_table :test_appointment_patients do |t|
      t.belongs_to :patient 
      t.belongs_to :test_appointment
      
      t.timestamps
    end
  end
end
