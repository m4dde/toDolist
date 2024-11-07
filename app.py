from flask import Flask, render_template, request, redirect, url_for, jsonify
import json

app = Flask(__name__)

def load_task():
    try:
        with open("tasks.json", "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return []
    
def lagre_task(tasks):
    with open("tasks.json", "w") as file:
        json.dump(tasks, file, indent=4)

@app.route("/")
def index():
    tasks = load_tasks()
    return render_template("index.html", tasks=tasks)

@app.route("/add", methods=["POST"])
def add_task():
    task_content = request.form.get("content")
    if task_content:
        tasks = load_tasks()
        new_task = {"id": len(tasks) +1, "content": task_content, "completed": False}
        tasks.append(new_task)
        save_tasks(tasks)
    return redirect(url_for("index"))

@app.route("/delete/<int:task_id>")
def delete_task(task_id):
    tasks = load_task()
    tasks = [task for task in tasks if task["id"] != task_id]
    save_tasks(tasks)
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(debug=True)



