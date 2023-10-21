import { Modal } from '@mui/material';
import { ReactNode } from 'react';

interface LargeModalProps {
    modalOpan:boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

const LargeModal: React.FC<LargeModalProps> = ({ modalOpan, setOpen, children }) => {
    const handleClose = () => setOpen(false);
  
  return (
    <Modal
      open={modalOpan}
      onClose={handleClose}
      className="flex items-center justify-center"
      aria-labelledby="large-modal-title"
      aria-describedby="large-modal-description"
    >
      <div className="bg-white rounded-lg shadow p-6 max-w-90% max-h-90vh overflow-auto">
        {children}
      </div>
    </Modal>
  );
};

export default LargeModal;