class TestTimeSerializer < ActiveModel::Serializer
  attributes :id, :time, :max_tests, :duration

  has_many :patients, through: :appointments

end
