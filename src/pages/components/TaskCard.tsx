import React from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform">
      <div className="p-4">
        <h2 className={`${task.completed ? 'line-through text-gray-500' : 'font-bold'} text-lg`}>{task.title}</h2>
        <p className="text-gray-700">{task.description}</p>
        <p className="text-gray-500">{task.dueDate}</p>
      </div>
      <div className="flex justify-end p-4 border-t">
        <button onClick={() => onToggleComplete(task.id)} className="text-blue-500 flex items-center mr-2">
          <img src="https://img.icons8.com/ios-filled/24/000000/checkmark.png" alt="Complete" />
        </button>
        <button onClick={() => onEdit(task)} className="text-yellow-500 flex items-center mr-2">
          <img src="https://img.icons8.com/ios-filled/24/000000/edit.png" alt="Edit" />
        </button>
        <button onClick={() => onDelete(task.id)} className="text-red-500 flex items-center">
          <img src="https://img.icons8.com/ios-filled/24/000000/trash.png" alt="Delete" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;