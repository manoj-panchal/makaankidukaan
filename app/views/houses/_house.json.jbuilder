json.extract! house, :id, :latitude, :longitude, :title, :created_at, :updated_at
json.url house_url(house, format: :json)
