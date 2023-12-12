
import { createTheme } from '@mui/material/styles';
import { Submission, Track } from 'src/types';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import { TableBody, TableCell } from '@mui/material';
import Image from 'next/image';

type LeaderboardProps = {
  track: Track;
  submissions: Submission[];
};

const defaultTheme = createTheme();

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  align: string | 'right' | 'left';
}

const headCells: HeadCell[] = [
  {
    id: 'position',
    align: 'left',
    disablePadding: true,
    label: 'Position',
  },
  {
    id: 'user_id',
    align: 'left',
    disablePadding: false,
    label: 'Player',
  },
  {
    id: 'score',
    align: 'right',
    disablePadding: false,
    label: 'Score',
  },
  {
    id: 'stars',
    align: 'right',
    disablePadding: false,
    label: 'Stars',
  },
];


export default function Leaderboard({ track, submissions }: LeaderboardProps) {
  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 750 }}
        aria-labelledby="tableTitle"
        size={'small'}
      >
        <TableHead>
          <TableRow className='bg-primary'>
            {headCells.map((headCell) => (
              <TableCell
                className='table-header'
                key={headCell.id}
                align={headCell.align}
                padding={headCell.disablePadding ? 'none' : 'normal'}
              >
                {headCell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {submissions.map((submission, idx) => (
            <TableRow
              key={submission.submission_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {idx + 1}
              </TableCell>
              <TableCell align="left" style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <Image
                  alt= {track.title}
                  src={`https://github.com/${submission.user_id}.png`}
                  width={40}
                  height={40}
                  style={{
                    borderRadius: '50%',
                  }}
                />
                {submission.user_id}
              </TableCell>
              <TableCell align="right">{submission.score}</TableCell>
              <TableCell align="right">{submission.stars}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};