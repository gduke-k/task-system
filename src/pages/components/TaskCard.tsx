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
  // Ensure all task properties are available
  if (!task) {
    console.error("Task object is undefined.");
    return null;
  }

  const { id, title, description, dueDate, completed } = task;

  // Render the task card
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
      role="article"
      aria-label={`Task card for ${title}`}
    >
      <div className="p-4">
        <h2 className={`${completed ? 'line-through text-gray-500' : 'font-bold'} text-lg`}>
          {title || "Untitled Task"}
        </h2>
        <p className="text-gray-700">{description || "No description provided."}</p>
        <p className="text-gray-500">{dueDate || "No due date set."}</p>
      </div>
      <div className="flex justify-end p-4 border-t">
        {/* Toggle Completion Button */}
        <button
          onClick={() => onToggleComplete(id)}
          className="text-blue-500 flex items-center mr-2"
          aria-label={`Mark task ${completed ? 'incomplete' : 'complete'}`}
        >
          <img
            src="https://img.icons8.com/ios-filled/24/000000/checkmark.png"
            alt="Complete"
          />
        </button>

        {/* Edit Button */}
        <button
          onClick={() => onEdit(task)}
          className="text-yellow-500 flex items-center mr-2"
          aria-label={`Edit task ${title}`}
        >
          <img
            src="https://img.icons8.com/ios-filled/24/000000/edit.png"
            alt="Edit"
          />
        </button>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(id)}
          className="text-red-500 flex items-center"
          aria-label={`Delete task ${title}`}
        >
          <img
            src="https://img.icons8.com/ios-filled/24/000000/trash.png"
            alt="Delete"
          />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;