from celery_config import example_task

if __name__ == "__main__":
    # Send a task to Celery
    result = example_task.delay()
    print(f"Task ID: {result.id}")
    print("Task sent to Celery!") 