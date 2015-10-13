class Api::BenchesController < ApplicationController
  def index
    @benches_in_bound = Bench.filter_by(params)
    render json: @benches_in_bound
  end

  def create
    @new_bench = Bench.new(bench_params)
    if @new_bench.save
      render json: @new_bench
    else
      fail
    end
  end

  def show
    @bench = Bench.find(params[:id])
    render json: @bench
  end

  private

  def bench_params
    params.require(:bench).permit(:description, :lng, :lat, :seating)
  end

end
