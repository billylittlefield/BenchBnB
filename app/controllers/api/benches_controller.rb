class Api::BenchesController < ApplicationController
  def index
    @benches_in_bound = Bench.in_bounds(params[:bounds])
    render json: @benches_in_bound
  end
end
