class Api::BenchesController < ApplicationController
  def index
    @benches_in_bound = Bench.in_bounds(params[:bounds])
    render json: @benches_in_bound
  end

  def create
    @newBench = Bench.new(bench_params)
    if @newBench.save
      render json: {}
    else
      fail
    end
  end

  private

  def bench_params
    params.require(:bench).permit(:description, :lng, :lat, :seating)
  end

end
