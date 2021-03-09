class TestTimesController < ApplicationController

    def index 
        test_times = TestTime.all

        render json: test_times
    end
end
