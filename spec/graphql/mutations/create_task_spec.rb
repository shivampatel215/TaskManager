# spec/graphql/mutations/create_task_spec.rb
require 'rails_helper'

RSpec.describe 'CreateTask', type: :request do
  let(:query) do
    <<-GRAPHQL
      mutation CreateTask($input: CreateTaskInput!) {
        createTask(input: $input) {
          task {
            id
            title
            description
            completed
            dueDate
          }
          errors
        }
      }
    GRAPHQL
  end

  it 'creates a task' do
    post '/graphql', params: { query: query, variables: { input: { title: "Test Task", description: "Test Desc"} } }
    json = JSON.parse(response.body)
    
    expect(json['data']['createTask']['task']).not_to be_nil
    expect(json['data']['createTask']['errors']).to be_empty
  end
end
