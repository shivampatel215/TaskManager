# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    
    field :allTasks, [Types::TaskType], null: false, description: "Returns a list of all tasks"
    field :task, Types::TaskType, null: true, description: "Returns a task by ID" do
      argument :id, ID, required: true
    end
    
    def allTasks
      Task.all
    end

    def task(id:)
      task = Task.find_by(id: id)
      return task if task
    
      raise GraphQL::ExecutionError.new('Task not found', extensions: { code: 'TASK_NOT_FOUND' })
    end
    
  end
end
