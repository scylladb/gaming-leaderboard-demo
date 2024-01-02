import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Leaderboard from 'src/components/leaderboard/Leaderboard';
import LeaderboardFilters from 'src/components/leaderboard/LeaderboardFilters';
import LeaderboardTrackCard from 'src/components/leaderboard/LeaderboardTrackCard';
import SideBar from "src/components/menu/SideBar";
import TopBar from "src/components/menu/TopBar";
import { Submission, Track } from 'src/types';
import { SubmissionResponse } from '../api/leaderboard/[trackId]';

const userId = "scylla-user"

export async function getServerSideProps(context) {
    const progress = context.query.progress ?? 0
    const trackId = context.params.trackId

    let queryParams = new URLSearchParams();
    queryParams.append('modifiers', 'no-modifiers');
    queryParams.append('instrument', 'guitar');
    queryParams.append('difficulty', 'expert+');
    queryParams.append('trackId', trackId);

    let { track, submissions } = await fetch(process.env.APP_BASE_URL + `/api/leaderboard/${trackId}?${queryParams.toString()}`)
        .then(res => res.json())


    return {
        props: {
            track, submissions
        }
    };
}

const defaultTheme = createTheme();

export default function TrackLeaderboard({ track, submissions }: SubmissionResponse) {

    // HERE WE KNOW STUFF

    const [submissionsList, setSubmissionsState] = useState<Submission[]>(submissions);

    const [modifiers, setModifiers] = useState<string[]>(['no-modifiers']);
    const [instrument, setInstrument] = useState<string>('guitar');
    const [difficulty, setDifficulty] = useState<string>('expert+');
    console.log(submissionsList)

    useEffect(() => {
        
        let queryParams = new URLSearchParams();
        queryParams.append('modifiers', modifiers.join(','));
        queryParams.append('instrument', instrument);
        queryParams.append('difficulty', difficulty);
        queryParams.append('trackId', track.track_id);

        fetch(`/api/leaderboard/${track?.track_id}?${queryParams.toString()}`)
            .then(res => res.json())
            .then(data => {
                setSubmissionsState(data.submissions as Submission[]);
            })

    }, [modifiers, instrument, difficulty]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <TopBar title="Track Leaderboard" />
                <SideBar />
                {/* Page content */}
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        

                        <LeaderboardTrackCard track={track}></LeaderboardTrackCard>


                        <LeaderboardFilters
                            selectedModifiers={modifiers}
                            setModifiers={setModifiers}
                            instrument={instrument}
                            setInstrument={setInstrument}
                            difficulty={difficulty}
                            setDifficulty={setDifficulty}
                        />

                        <Leaderboard track={track} submissions={submissionsList}></Leaderboard>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
