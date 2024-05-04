# frozen_string_literal: true

module Types
    class CreateTaskInputType < GraphQL::Schema::InputObject
      argument :title, String, required: true
      argument :description, String, required: true
      argument :completed, Boolean, required: false
      argument :due_date, GraphQL::Types::ISO8601Date, required: false
    end
  end
  
  