import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type ApiKey = {
  id: string;
  name: string;
  publicKey: string;
};

type ApiKeysTableProps = {
  apiKeys: ApiKey[];
  onDelete: (id: string) => void;
};

export default function ApiKeysTable({ apiKeys, onDelete }: ApiKeysTableProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Public Key</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {apiKeys.map((key) => (
          <TableRow key={key.id}>
            <TableCell>{key.name}</TableCell>
            <TableCell>{key.publicKey}</TableCell>
            <TableCell>
              <IconButton onClick={() => onDelete(key.id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
