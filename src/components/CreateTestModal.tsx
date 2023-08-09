import React, { useState } from 'react';
import {
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from '@mui/material';

export type CreateTestModalProps = {
  open: boolean;
  onClose: (resetData: () => void) => void;
  onCreate: (
    name: string,
    type: 'discrete' | 'continous',
    alpha: number
  ) => void;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function CreateTestModal({ open, onClose, onCreate }: CreateTestModalProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'discrete' | 'continous'>('discrete');
  const [alpha, setAlpha] = useState(0.05);

  const resetData = () => {
    setName('');
    setType('discrete');
    setAlpha(0.05);
  };

  const handleCreate = () => {
    onCreate(name, type, alpha);
    onClose(resetData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <div className="flex flex-col">
          <div className="text-2xl font-bold">Create Test</div>

          <div className="flex flex-row p-4 bg-white rounded centered-modal gap-4">
            <div className="col-auto">
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </div>

            <div className="col">
              <FormControl fullWidth className="my-4">
                <InputLabel>Type</InputLabel>
                <Select
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value as 'discrete' | 'continous')
                  }
                  fullWidth
                >
                  <MenuItem value="discrete">DISCRETE</MenuItem>
                  <MenuItem value="continous">CONTINOUS</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="col-auto">
              <FormControl fullWidth className="my-4">
                <InputLabel>Alpha</InputLabel>
                <Select
                  value={alpha}
                  onChange={(e) => setAlpha(e.target.value as number)}
                  fullWidth
                >
                  <MenuItem value={0.01}>0.01</MenuItem>
                  <MenuItem value={0.05}>0.05</MenuItem>
                  <MenuItem value={0.1}>0.1</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="row-auto flex justify-center align-center">
            <Button variant="contained" color="primary" onClick={handleCreate}>
              Create
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default CreateTestModal;
