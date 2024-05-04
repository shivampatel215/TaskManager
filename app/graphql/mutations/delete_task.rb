# frozen_string_literal: true

  module Mutations
    class DeleteTask < BaseMutation
      argument :id, ID, required: true
  
      type Types::TaskType
  
      def resolve(id:)
        task = Task.find_by(id: id)
        return { errors: ['Task not found'] } unless task
  
        task.destroy
        task
      rescue StandardError => e
        # Log the error or send it to an error tracking system
        raise GraphQL::ExecutionError.new("Unable to delete task: #{e.message}")
      end
    end
  end
  