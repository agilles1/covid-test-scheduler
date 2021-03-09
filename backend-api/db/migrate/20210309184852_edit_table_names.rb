class EditTableNames < ActiveRecord::Migration[6.0]
  def change
    rename_table :test_appointments, :test_times
    rename_table :test_appointment_patients, :appointments
  end
end
