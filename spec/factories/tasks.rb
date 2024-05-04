FactoryBot.define do
    factory :task do
      title { "Default Title" }
      description { "Default Description" }
      completed { false }
      due_date { nil }
    end
  end
  