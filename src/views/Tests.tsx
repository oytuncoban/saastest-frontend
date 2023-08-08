import { ArrowBackIos, Refresh } from '@mui/icons-material';
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
import { INITIAL_ROWS, Test, getTests } from '@/services/test';

export default function Tests() {
  const [rows, setRows] = useImmer<Test[]>(INITIAL_ROWS);
  const [selectedTestId, setSelectedTestId] = useImmer<string | null>(null);

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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              Test Name
              <IconButton className="p-0 !ml-2" onClick={() => refetchTests()}>
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
  ) : (
    <>
      {' '}
      <Button
        variant="outlined"
        onClick={() => {
          setSelectedTestId(null);
        }}
      >
        <ArrowBackIos />
        Go Back
      </Button>
    </>
  );
}
