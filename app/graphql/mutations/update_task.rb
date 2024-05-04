# frozen_string_literal: true

module Mutations
    class UpdateTask < BaseMutation

      field :task, Types::TaskType, null: true
      field :errors, [String], null: false
      argument :id, ID, required: true
      argument :title, String, required: false
      argument :description, String, required: false
      argument :completed, Boolean, required: false
      argument :due_date, GraphQL::Types::ISO8601Date, required: false
  
  
      def resolve(id:, title: nil, description: nil, completed: nil, due_date: nil)
        task = Task.find_by(id: id)
        if task.nil?
          return { task: nil, errors: ['Task not found'] }
        end

  
        if task.update(title: title, description: description, completed: completed, due_date: due_date)
          { task: task, errors: [] }
        else
          { task: nil, errors: task.errors.full_messages }
        end
      end
    end
  end
  