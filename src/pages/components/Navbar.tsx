import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white w-full">
        <img 
          src="https://img.icons8.com/ios-filled/24/ffffff/task.png"
          alt="Tasks Icon"
          className="mr-2"
        />
      <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
          <img 
            src="https://img.icons8.com/ios-filled/24/ffffff/user.png" 
            alt="User Icon" 
            className="w-6 h-6"
          />
      </div>
    </nav>
  );
};

export default Navbar;