class Bench < ActiveRecord::Base
  validates :description, :lat, :lng, null: false

  def self.filter_by(params)
    # bounds in the following format:
    # {
    #   "northEast"=> {"lat"=>"37.80971", "lng"=>"-122.39208"},
    #   "southWest"=> {"lat"=>"37.74187", "lng"=>"-122.47791"}
    # }
    p "minseating is #{params['min_seating']}"
    return Bench.where('(lat BETWEEN ? AND ?) AND (lng BETWEEN ? AND ?)',
              params['bounds']['southWest']['lat'],
              params['bounds']['northEast']['lat'],
              params['bounds']['southWest']['lng'],
              params['bounds']['northEast']['lng'])
            .where('seating BETWEEN ? AND ?',
              params['min_seating'],
              params['max_seating']);
  end
end
