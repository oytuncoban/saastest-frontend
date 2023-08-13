import { ContentCopy } from '@mui/icons-material';
import { Modal, Button, Typography, Box, IconButton } from '@mui/material';

type KeyResponseModalProps = {
  open: boolean;
  onClose: () => void;
  apiKeyData: {
    name: string;
    publicKey: string;
    privateKey: string;
  };
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

export default function KeyResponseModal({
  open,
  onClose,
  apiKeyData,
}: KeyResponseModalProps) {
  const copyToClipboard = (data: string) => {
    navigator.clipboard.writeText(data);
  };

  return (
    // <div className="top-1/2 left-1/2 translate-x-1/2 translate-y-1/2 absolute">
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <div className="flex flex-col gap-2">
          <Typography variant="h5">
            New API Key Created:{' '}
            <span className="font-bold">{apiKeyData.name}</span>
          </Typography>
          <div className="row-auto flex items-center justify-between">
            <Typography>Prefix: {apiKeyData.publicKey}</Typography>

            {/* <Button
              onClick={() => }
              startIcon={<ClipboardDocumentIcon />}
            >
              Copy
            </Button> */}
          </div>
          <div className="row-auto flex items-center justify-between">
            <Typography sx={{ color: 'red' }}>
              Private Key: {apiKeyData.privateKey}
            </Typography>
          </div>
          <div className="row-auto flex items-center justify-between">
            <Typography>
              API Key: {`${apiKeyData.publicKey}.${apiKeyData.privateKey}`}
            </Typography>
            <IconButton
              className="p-0 !ml-2"
              onClick={() =>
                copyToClipboard(
                  `${apiKeyData.publicKey}.${apiKeyData.privateKey}`
                )
              }
            >
              <ContentCopy />
            </IconButton>
          </div>
          <div className="row-auto bg-yellow-200 p-2 rounded">
            <Typography>
              Warning: The private key will not be retrievable once this modal
              is closed.
            </Typography>
          </div>
          <div className="row-auto flex justify-center mt-4">
            <Button
              variant="contained"
              color="success"
              sx={{ color: 'white' }}
              onClick={onClose}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
    // </div>
  );
}
