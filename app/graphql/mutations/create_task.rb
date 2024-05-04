# frozen_string_literal: true

module Mutations
    class CreateTask < BaseMutation
      field :task, Types::TaskType, null: false
      field :errors, [String], null: false
  
      argument :input, Types::CreateTaskInputType, required: true
  
      def resolve(input:)
        task = Task.new(input.to_h)
        if task.save
          { task: task, errors: [] }
        else
          { task: nil, errors: task.errors.full_messages }
        end
      end
    end
  end

  
  
  