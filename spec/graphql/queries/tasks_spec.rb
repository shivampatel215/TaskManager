# spec/graphql/queries/tasks_spec.rb
require 'rails_helper'

RSpec.describe 'Task Queries', type: :request do
    before(:all) do
        Task.delete_all
    end
  let!(:tasks) { create_list(:task, 3) }

  describe 'allTasks' do
    let(:query) do
      <<-GRAPHQL
        query {
          allTasks {
            id
            title
          }
        }
      GRAPHQL
    end

    it 'returns all tasks' do
      post '/graphql', params: { query: query }
      json = JSON.parse(response.body)
      expect(json['data']['allTasks'].size).to eq(3)
    end
  end

  describe 'task' do
    let(:query) do
      <<-GRAPHQL
        query Task($id: ID!) {
          task(id: $id) {
            id
            title
          }
        }
      GRAPHQL
    end

    it 'returns a task by id' do
      task = tasks.first
      post '/graphql', params: { query: query, variables: { id: task.id } }
      json = JSON.parse(response.body)
      expect(json['data']['task']['id']).to eq(task.id.to_s)
      expect(json['data']['task']['title']).to eq(task.title)
    end
  end
end
