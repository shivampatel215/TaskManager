require "test_helper"

class TaskTest < ActiveSupport::TestCase
  setup do
    @task = Task.new(
      title: "Task Title",
      description: "Task Description",
      completed: false
    )
  end

  test "should be valid with mandatory attributes" do
    assert @task.valid?, "Task should be valid when all required attributes are provided"
  end

  test "should have an automatically generated ID upon saving" do
    @task.save
    assert @task.id.present?, "Task should have an auto-generated ID after saving"
  end

  test "should require a title" do
    @task.title = nil
    assert_not @task.valid?, "Task should be invalid without a title"
  end

  test "completed attribute should default to false" do
    new_task = Task.create(title: "New Task", description: "Testing completion")
    assert_not new_task.completed, "New task should default completed attribute to false"
  end

  test "should not allow a task to have no description" do
    @task.description = nil
    assert !@task.valid?, "Task should be invalid without a description"
  end

  test "due_date should be optional" do
    @task.due_date = nil
    assert @task.valid?, "Task should be valid without a due date"
  end

  test "should accept a valid date for due_date" do
    @task.due_date = Date.current
    assert @task.valid?, "Task should be valid with a correct due date format"
  end

end
