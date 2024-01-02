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
import { PlayerProfileResponse } from '../api/players/[playerId]';
import PlayerProfileCard from 'src/components/player/PlayerProfileCard';
import PlayerSubmissionHistory from 'src/components/player/PlayerSubmissionHistory';

export async function getServerSideProps(context) {
    const playerId = context.params.playerId

    let { player, submissionHistory } = await fetch(process.env.APP_BASE_URL + `/api/players/${playerId}`)
        .then(res => res.json())


    return {
        props: {
            player,
            submissionHistory
        }
    };
}

const defaultTheme = createTheme();

export default function PlayerProfile({ player, submissionHistory, }: PlayerProfileResponse) {

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <TopBar title="Player Profile" />
                <SideBar />
            
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
                        <PlayerProfileCard player={player}/>
                        <PlayerSubmissionHistory submissions={submissionHistory} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
