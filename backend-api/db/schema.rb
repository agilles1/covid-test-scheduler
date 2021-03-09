# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_03_09_175052) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "patients", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "job_title"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "test_appointment_patients", force: :cascade do |t|
    t.bigint "patient_id"
    t.bigint "test_appointment_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["patient_id"], name: "index_test_appointment_patients_on_patient_id"
    t.index ["test_appointment_id"], name: "index_test_appointment_patients_on_test_appointment_id"
  end

  create_table "test_appointments", force: :cascade do |t|
    t.date "date"
    t.time "start"
    t.time "end"
    t.integer "max_tests"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
