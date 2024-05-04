require 'rails_helper'

RSpec.describe 'UpdateTask', type: :request do
  let!(:task) { create(:task, title: "Original Title", description: "Original Description") }
  let(:query) do
    <<-GRAPHQL
      mutation UpdateTask($id: ID!, $title: String!, $description: String!) {
        updateTask(id: $id, title: $title, description: $description) {
          task {
            id
            title
            description
          }
          errors
        }
      }
    GRAPHQL
  end

  it 'updates a task' do
    post '/graphql', params: { query: query, variables: { id: task.id, title: "Updated Title", description: "Updated Description" } }
    json = JSON.parse(response.body)
    expect(json['data']['updateTask']['task']['title']).to eq("Updated Title")
    expect(json['data']['updateTask']['task']['description']).to eq("Updated Description")
    expect(json['data']['updateTask']['errors']).to be_empty
  end

end
