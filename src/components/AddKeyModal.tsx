import { Modal, TextField, Button, Box } from '@mui/material';
import { useState } from 'react';

type AddKeyModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (keyName: string) => void;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddKeyModal({
  open,
  onClose,
  onSubmit,
}: AddKeyModalProps) {
  const [keyName, setKeyName] = useState('');

  const handleSubmit = () => {
    onSubmit(keyName);
    onClose();
  };

  return (
    // <div className="top-1/2 left-1/2 translate-x-1/2 translate-y-1/2 absolute">
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <div className="p-4 bg-white rounded flex flex-col gap-4">
          <div className="row-auto">
            <TextField
              label="Key Name"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              fullWidth
            />
          </div>

          <div className="row-auto">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Create
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
    // </div>
  );
}
