class TestTime < ApplicationRecord
    has_many :appointments
    has_many :patients, through: :appointments

    def self.create_from_params(params)
        date = params["date"]
        start_time = params["start"]
        end_time = params["end"]
        max_tests = params["max_tests"].to_i
        date_start = "#{date} #{start_time}".to_datetime
        date_end = "#{date} #{end_time}".to_datetime
      
        until date_start == date_end
            self.create(time: date_start, duration: 15, max_tests: max_tests)
            date_start+=15.minutes
        end
    end

end
