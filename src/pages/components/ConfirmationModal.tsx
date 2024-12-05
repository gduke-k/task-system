import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"> {/* Added z-50 */}
      <div className="bg-white rounded-lg p-6 w-80">
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this task?</p>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2 text-gray-500">Cancel</button>
          <button onClick={onConfirm} className="bg-red-600 text-white rounded px-4 py-2">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;