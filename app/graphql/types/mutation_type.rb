# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    # TODO: remove me
    field :create_task, mutation: Mutations::CreateTask
    field :update_task, mutation: Mutations::UpdateTask
    field :delete_task, mutation: Mutations::DeleteTask
  end
end
