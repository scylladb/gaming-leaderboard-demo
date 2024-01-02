
import { createTheme } from '@mui/material/styles';
import { Submission, Track } from 'src/types';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import { Card, TableBody, TableCell, Typography } from '@mui/material';
import Image from 'next/image';


interface HeadCell {
    disablePadding: boolean;
    id: string;
    label: string;
    align: string | 'right' | 'left';
}

const headCells: HeadCell[] = [
    {
        id: 'track',
        align: 'left',
        disablePadding: true,
        label: 'Track',
    },
    {
        id: 'score',
        align: 'left',
        disablePadding: false,
        label: 'Score',
    },
    {
        id: 'accuracy',
        align: 'right',
        disablePadding: false,
        label: 'Accuracy',
    },
    {
        id: 'stars',
        align: 'right',
        disablePadding: false,
        label: 'Stars',
    },
    {
        id: 'played_at',
        align: 'right',
        disablePadding: false,
        label: 'Played At',
    },
];

type PlayerSubmissionHistoryProps = {
    submissions: Submission[];
};

export default function PlayerSubmissionHistory({ submissions }: PlayerSubmissionHistoryProps) {
    return (
        <Card sx={{ p: 2 }}>
            <Typography gutterBottom variant="h5" component="h5">
                Submission History
            </Typography>
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
                                    align="left"
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
                                    {submission.track_id}
                                </TableCell>
                                <TableCell>{submission.score}</TableCell>
                                <TableCell>{submission.accuracy_percentage ?? 100}%</TableCell>
                                <TableCell>{submission.stars ?? 5}</TableCell>
                                <TableCell>{submission.played_at}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};