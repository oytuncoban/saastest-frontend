import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { TestResults } from '@/services/test';

// Extend the props to accept the computed statistics
export type TestTableProps = {
  variantStats: Pick<TestResults, 'A' | 'B'> | undefined;
  generalStats: Pick<TestResults, 'significance' | 'alpha' | 'mean' | 'median'>;
};

function TestTable({ variantStats, generalStats }: TestTableProps) {
  return variantStats ? (
    <TableContainer component={Paper}>
      <Table className="mb-4">
        <TableHead>
          <TableRow>
            <TableCell align="center">Variant</TableCell>
            <TableCell align="center">Variance</TableCell>
            <TableCell align="center">Conversion Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(variantStats).map(([variant, stats]) => (
            <TableRow key={variant}>
              <TableCell align="center">{variant}</TableCell>
              <TableCell align="center">{stats?.variance}</TableCell>
              <TableCell align="center">{stats?.conversionRate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {generalStats && (
        <Table className="mb-4">
          <TableHead>
            <TableRow>
              <TableCell align="right">General Statistics</TableCell>
            </TableRow>
          </TableHead>
          <TableRow>
            <TableCell align="right">Significance:</TableCell>
            <TableCell align="right">{generalStats.significance}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">Alpha: </TableCell>
            <TableCell align="right">{generalStats.alpha}</TableCell>
          </TableRow>
        </Table>
      )}
    </TableContainer>
  ) : null;
}

export default TestTable;
