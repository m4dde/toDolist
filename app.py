import json
import os

def load_tasks():
    """Load tasks from JSON file"""
    if os.path.exists('todo.json'):
        with open('todo json', 'r') as f:
            return json.load(f)
    else:
        return []
    
def lagre_tasks(tasks):
    """Save tasks to JSON file"""
    with open('todo.json', 'w') as f:
        json.dump(tasks, f)

def display_tasks(tasks):
    """Display all tasks"""
    print("To-do list:")
    for i, task in enumerate(tasks, 1):
        print(f"{i}. {task}")

def add_task(tasks):
    """Add a new task"""
    new_task = input("Enter a new task: ")
    tasks.append(new_task)
    lagre_tasks(tasks)
    print("Task added successfully!")

def delete_task(tasks):
    """Delete a task"""
    display_tasks(tasks)
    task_number = int(input("Enter the number of the task to delete: ")) - 1
    if 0 <= task_number < len(tasks):
        del tasks[task_number]
        lagre_tasks(tasks)
        print("Task deleted successfully!")
    else:
        print("Invalid task number.")

def complete(tasks):
    """Mark a task as completed"""
    display_tasks(tasks)
    task_number = int(input("Enter the number of the task to mark complete: ")) - 1
    if 0 <= task_number < len(tasks):
        tasks[task_number]["completed"] = True
        lagre_tasks(tasks)
        print("Task marked as complete!")
    else:
        print("Invalid task number.")




