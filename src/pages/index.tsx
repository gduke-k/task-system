import { useState } from 'react';
import TaskEditor from './components/TaskEditor';
import TaskCard from './components/TaskCard';
import Modal from './components/Model'; // Ensure this is correctly named
import ConfirmationModal from './components/ConfirmationModal';
import Navbar from './components/Navbar';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Finish project',
      description: 'Write up the project and send it to the client',
      dueDate: '2024-12-15',
      completed: false
    },
    {
      id: 2,
      title: 'Go to Gym',
      description: 'go gym this week',
      dueDate: '2024-12-05',
      completed: true
    },
    {
      id: 3,
      title: 'Implement new feature',
      description: 'Add the new feature to the application',
      dueDate: '2024-12-2',
      completed: false
    },
    {
      id: 4,
      title: 'Review code',
      description: 'Review the latest code changes before merging',
      dueDate: '2024-12-12',
      completed: false
    },
    {
      id: 5,
      title: 'Deploy to production',
      description: 'Deploy the latest version to the production environment',
      dueDate: '2024-12-18',
      completed: true
    }
  ]);
  
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // State for filter modal
  const [filter, setFilter] = useState<string>('All Tasks'); // Active filter
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query

  const handleAddTask = (task: Omit<Task, 'id' | 'completed'>) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
    setIsModalOpen(false);
  };

  const handleUpdateTask = (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    setIsModalOpen(false);
  };

  const handleDeleteTask = (id: number) => {
    setTaskToDelete(id); // Set the task to be deleted
    setIsConfirmationOpen(true); // Open the confirmation modal
  };

  const confirmDeleteTask = () => {
    if (taskToDelete !== null) {
      setTasks(tasks.filter(task => task.id !== taskToDelete)); // Delete the task
      setTaskToDelete(null); // Reset the task to delete
    }
    setIsConfirmationOpen(false); // Close the confirmation modal
  };

  const handleToggleComplete = (id: number) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen); // Toggle filter modal state
  };

  const applyFilter = (selectedFilter: string) => {
    setFilter(selectedFilter); // Set the selected filter
    setIsFilterModalOpen(false); // Close the filter modal
  };

  const filteredTasks = () => {
    const currentDate = new Date();
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      switch (filter) {
        case 'Completed Tasks':
          return task.completed && matchesSearch;
        case 'Pending Tasks':
          return !task.completed && matchesSearch;
        case 'Overdue Tasks':
          return new Date(task.dueDate) < currentDate && matchesSearch;
        default:
          return matchesSearch; // All Tasks
      }
    });
  };

  // Render filter options inside the modal
  const renderFilterOptions = () => {
    const filters = ['All Tasks', 'Completed Tasks', 'Pending Tasks', 'Overdue Tasks'];
    return (
      <div>
        <div className="mb-4 text-lg font-semibold">Select Filter</div>
        <ul className="flex flex-col space-y-2">
          {filters.map(filterOption => (
            <li key={filterOption}>
              <button
                onClick={() => applyFilter(filterOption)} 
                className="w-full text-left p-2 bg-gray-200 hover:bg-gray-300"
              >
                {filterOption}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-700">
      <Navbar />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskEditor 
          onAddTask={handleAddTask} 
          onUpdateTask={handleUpdateTask} 
          editingTask={editingTask} 
        />
      </Modal>
      <Modal isOpen={isFilterModalOpen} onClose={toggleFilterModal}>
        {renderFilterOptions()}
      </Modal>
      <ConfirmationModal 
        isOpen={isConfirmationOpen} 
        onClose={() => setIsConfirmationOpen(false)} 
        onConfirm={confirmDeleteTask} 
      />
      <div className="flex-1 overflow-y-auto mt-2 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTasks().length === 0 ? (
            <div className="text-gray-500 col-span-full">No tasks available</div>
          ) : (
            filteredTasks().map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onEdit={handleEditTask} 
                onDelete={handleDeleteTask} 
                onToggleComplete={handleToggleComplete} 
              />
            ))
          )}
        </div>
      </div>
      <div className="absolute bottom-10 right-4 flex flex-col items-center">
        <button
          onClick={toggleFilterModal} 
          className="bg-blue-600 text-white w-14 h-14 rounded-lg flex items-center justify-center shadow-lg mb-2"
        >
          <img src="https://img.icons8.com/ios-filled/24/ffffff/filter.png" alt="Filter" />
        </button>
        <button
          onClick={() => {
            setEditingTask(null);
            setIsModalOpen(true);
          }}
          className="bg-green-600 text-white w-14 h-14 rounded-lg flex items-center justify-center shadow-lg"
        >
          <span className="text-3xl font-bold">+</span>
        </button>
      </div>
    </div>
  );
}