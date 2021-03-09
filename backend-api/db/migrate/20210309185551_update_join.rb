class UpdateJoin < ActiveRecord::Migration[6.0]
  def change
    rename_column :appointments, :test_appointment_id, :test_time_id
    
  end
end
