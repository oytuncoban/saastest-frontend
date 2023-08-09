import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@mui/material';

export default function AddKeyButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      <PlusIcon className="h-5 w-5 mr-2" />
      Add Key
    </Button>
  );
}
