class CreateTestAppointments < ActiveRecord::Migration[6.0]
  def change
    create_table :test_appointments do |t|
      t.date :date
      t.time :start
      t.time :end
      t.integer :max_tests

      t.timestamps
    end
  end
end
