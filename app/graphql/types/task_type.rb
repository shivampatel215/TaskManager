module Types
    class TaskType < Types::BaseObject
      field :id, ID, null: false
      field :title, String, null: false
      field :description, String, null: true
      field :completed, Boolean, null: false
      field :due_date, GraphQL::Types::ISO8601Date, null: true
    end
  end
  