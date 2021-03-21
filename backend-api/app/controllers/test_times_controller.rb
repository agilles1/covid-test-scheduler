class TestTimesController < ApplicationController

    def index 
        test_times = TestTime.all

        render json: test_times
    end

    def create
        TestTime.create_from_params(test_time_params)
        test_times = TestTime.all
        render json: test_times
    end

    private

    def test_time_params
        params.require(:appointment).permit(:date, :start, :end, :max_tests)
    end

end
