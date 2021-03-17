# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

Patient.destroy_all
Patient.reset_pk_sequence

TestTime.destroy_all
TestTime.reset_pk_sequence

Appointment.destroy_all
Appointment.reset_pk_sequence

15.times {
    p = Patient.new(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: Faker::Internet.email, job_title: Faker::Job.title)
    p.save
}

t = [0, 15, 30, 45]

t.each do |min|
    time = TestTime.create(time: DateTime.new(2021, 3, 5, 9, min), duration: 15, max_tests: 8) 
    time.save
end

t.each do |min|
    time = TestTime.create(time: DateTime.new(2021, 3, 6, 9, min), duration: 15, max_tests: 8) 
    time.save
end


Patient.all.each do |p|
    apt = p.appointments.build
    apt.location = "Heinz Hall Lobby"
    apt.test_time =  TestTime.all.sample()
    apt.save
end

15.times {
    p = Patient.new(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: Faker::Internet.email, job_title: Faker::Job.title)
    p.save
}