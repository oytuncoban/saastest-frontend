import { useState } from 'react';
import { Button } from '@mui/material';
import { useImmer } from 'use-immer';
import { uuidv4 } from '@/utils';
import AddKeyModal from '@/components/AddKeyModal';
import KeyResponseModal from '../components/KeyResponseModal';
import ApiKeysTable from '@/components/ApiKeysTable';

export interface APIKey {
  id: string;
  name: string;
  publicKey: string;
  privateKey: string;
}

const MOCK_API_KEYS = [
  {
    id: '1',
    name: 'First Key',
    publicKey: 'b757321c-364f-11ee-be56-0242ac120002',
    privateKey: 'c01f9c2c-364f-11ee-be56-0242ac120002',
  },
  {
    id: '2',
    name: 'Key for ProductX',
    publicKey: 'ce013102-364f-11ee-be56-0242ac120002',
    privateKey: 'd06fa48c-364f-11ee-be56-0242ac120002',
  },
];

export function APIKeys() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openKeyModal, setOpenKeyModal] = useState(false);
  const [currentKey, setCurrentKey] = useState<APIKey>();
  const [apiKeys, setApiKeys] = useImmer<APIKey[]>(MOCK_API_KEYS);

  const handleAddKey = (keyName: string) => {
    const newKey: APIKey = {
      id: Date.now().toString(), // This can also be a UUID if you prefer
      name: keyName,
      publicKey: uuidv4(),
      privateKey: uuidv4(),
    };
    setApiKeys((prevKeys) => [...prevKeys, newKey]);
    setCurrentKey(newKey);
    setOpenKeyModal(true);
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys((prevKeys) => prevKeys.filter((key) => key.id !== id));
  };

  return (
    <div className="p-4 space-y-4">
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAddModal(true)}
      >
        Add Key
      </Button>

      <AddKeyModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSubmit={handleAddKey}
      />

      {currentKey && (
        <KeyResponseModal
          open={openKeyModal}
          onClose={() => setOpenKeyModal(false)}
          apiKeyData={currentKey}
        />
      )}

      {/* API Keys Table */}
      <ApiKeysTable apiKeys={apiKeys} onDelete={handleDeleteKey} />
    </div>
  );
}

export default APIKeys;
