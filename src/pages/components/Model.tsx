import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-4 relative w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-600 text-white w-12 h-12 rounded-md flex items-center justify-center shadow-lg"
        >
          <span className="text-lg font-bold">X</span>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;