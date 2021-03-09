class UpdateTestAppointments < ActiveRecord::Migration[6.0]
  def change
    drop_table :test_appointments

    create_table :test_appointments do |t|
      t.datetime :time
      t.integer :duration
      t.integer :max_tests

      t.timestamps
    end
  end
end
