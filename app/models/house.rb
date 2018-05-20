class House < ApplicationRecord
	geocoded_by :address

  after_validation :geocode, if: ->(obj){ (obj.latitude.blank? && obj.longitude.blank?) || ((obj.latitude.present? && obj.latitude_changed?) || (obj.longitude.present? && obj.longitude_changed?) ) }


  def self.get_near_by_houses lat, lng
    near_by_houses = House.near([lat.try(:to_f), lng.try(:to_f)], 20, units: :mi)
  end

end
