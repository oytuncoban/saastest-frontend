import { PlusIcon } from '@heroicons/react/24/outline';
import { Refresh } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import { useImmer } from 'use-immer';
import CreateTestModal from '@/components/CreateTestModal';
import { INITIAL_ROWS, Test, getTests } from '@/services/test';
import DetailedTest from '@/views/DetailedTest';

export default function Tests() {
  const [rows, setRows] = useImmer<Test[]>(INITIAL_ROWS);
  const [selectedTestId, setSelectedTestId] = useImmer<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useImmer<boolean>(false);

  useEffect(() => {
    getTests().then((r: { data: Test[] }) => {
      setRows(() => r.data);
    });
  }, [setRows]);

  function refetchTests() {
    getTests().then((r: { data: Test[] }) => {
      setRows(() => r.data);
    });
  }

  return !selectedTestId ? (
    <div className="flex flex-col gap-4">
      <div className="text-2xl font-bold">Tests</div>
      <div className="row-auto">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Create New Test
        </Button>
        <CreateTestModal
          open={isModalOpen}
          onClose={(resetData) => {
            setIsModalOpen(false);
            resetData();
          }}
          onCreate={(name, type, alpha) => {
            setRows((draft) => {
              draft.push({
                id: Math.floor(Math.random() * 1000).toString(),
                name,
                type,
                alpha,
              });
            });
            setIsModalOpen(false);
          }}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                Test Name
                <IconButton
                  className="p-0 !ml-2"
                  onClick={() => refetchTests()}
                >
                  <Refresh />
                </IconButton>
              </TableCell>
              <TableCell>Data Type</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell className="uppercase">{row.type}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setSelectedTestId(row.id);
                    }}
                  >
                    DETAILS
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ) : (
    <DetailedTest
      selectedTestId={selectedTestId}
      setSelectedTestId={setSelectedTestId}
    />
  );
}
