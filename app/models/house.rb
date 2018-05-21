class House < ApplicationRecord
	enum house_type: [:bunglow, :apartment, :flats]
	geocoded_by :address

  after_validation :geocode, if: ->(obj){ (obj.latitude.blank? && obj.longitude.blank?) || ((obj.latitude.present? && obj.latitude_changed?) || (obj.longitude.present? && obj.longitude_changed?) ) }
  

  scope :near_by, lambda {|lat,lng| 
	  near([lat.try(:to_f) || ENV["DEFAULT_LAT"] , lng.try(:to_f) || ENV["DEFAULT_LONG"] ], ENV["RADIUS"], units: :mi)
	}

  def self.search params={}
    conditions = []
    param = []
    if params[:house_type].present?
      conditions << "house_type = ?"
      param << params[:house_type]
    end
    if params[:min_price].present?
      conditions << "price >= ?"
      param << params[:min_price]
    end
    if params[:max_price].present?
      conditions << "price <= ?"
      param << params[:max_price]
    end
    where(conditions.join(' and '), *param)
  end

end
