import { useState } from 'react';
import { Box, Button, Paper } from '@mui/material';
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
    publicKey: 'R0Pw0pg',
    privateKey: '9iDG0CQSFqu3XkJcC5SaCWukG',
  },
  {
    id: '2',
    name: 'Key for ProductX',
    publicKey: '2f7c4ta',
    privateKey: 'l0fCvRj7Dh8ftfTgiGj329u73',
  },
];

export function APIKeys() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openKeyModal, setOpenKeyModal] = useState(false);
  const [currentKey, setCurrentKey] = useState<APIKey>();
  const [apiKeys, setApiKeys] = useImmer<APIKey[]>([]);

  function generateApiKey() {
    const prefixLength = 7;
    const keyLength = 25;
    const prefixChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const keyChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';

    let prefix = '';
    for (let i = 0; i < prefixLength; i++) {
      prefix += prefixChars.charAt(
        Math.floor(Math.random() * prefixChars.length)
      );
    }

    let key = '';
    for (let i = 0; i < keyLength; i++) {
      key += keyChars.charAt(Math.floor(Math.random() * keyChars.length));
    }

    return `${prefix}.${key}`;
  }

  const handleAddKey = (keyName: string) => {
    const key = generateApiKey();
    const newKey: APIKey = {
      id: Date.now().toString(), // This can also be a UUID if you prefer
      name: keyName,
      publicKey: key.split('.')[0],
      privateKey: key.split('.')[1],
    };
    setApiKeys((prevKeys) => [...prevKeys, newKey]);
    setCurrentKey(newKey);
    setOpenKeyModal(true);
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys((prevKeys) => prevKeys.filter((key) => key.id !== id));
  };

  return (
    <Box component={Paper}>
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
    </Box>
  );
}

export default APIKeys;
