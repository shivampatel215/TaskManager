require 'rails_helper'

RSpec.describe 'DeleteTask', type: :request do
  let!(:task) { create(:task) }
  let(:query) do
    <<-GRAPHQL
      mutation DeleteTask($id: ID!) {
        deleteTask(id: $id) {
          id
        }
      }
    GRAPHQL
  end

  it 'deletes a task' do
    expect { 
      post '/graphql', params: { query: query, variables: { id: task.id } }
    }.to change { Task.count }.by(-1)
    
    json = JSON.parse(response.body)
    expect(json.dig('data', 'deleteTask', 'id')).to eq(task.id.to_s)
  end

  it 'returns an error for a non-existent task' do
    post '/graphql', params: { query: query, variables: { id: 'non-existent' } }
    json = JSON.parse(response.body)
    expect(json['errors']).not_to be_empty
  end
end
