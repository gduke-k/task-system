import React, { useState, useEffect } from 'react';

interface Task {
  title: string;
  description: string;
  dueDate: string;
}

interface TaskEditorProps {
  onAddTask: (task: Task & { id: number }) => void;
  onUpdateTask: (task: Task & { id: number }) => void;
  editingTask: Task | null;
}

const TaskEditor: React.FC<TaskEditorProps> = ({ onAddTask, onUpdateTask, editingTask }) => {
  const [title, setTitle] = useState(editingTask ? editingTask.title : '');
  const [description, setDescription] = useState(editingTask ? editingTask.description : '');
  const [dueDate, setDueDate] = useState(editingTask ? editingTask.dueDate : '');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDueDate(editingTask.dueDate);
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const task = { title, description, dueDate };
    if (editingTask) {
      onUpdateTask({
        id: 0
      });
    } else {
      onAddTask({ ...task, id: Date.now() }); // Generate a unique ID
    }
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4 text-lg font-semibold">{editingTask ? 'Edit Task' : 'Add New Task'}</div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="border p-2 mb-2"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="border p-2 mb-2 h-32"
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskEditor;
