import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Footer from "src/components/Footer";
import SideBar from "src/components/menu/SideBar";
import TopBar from "src/components/menu/TopBar";
import PlayerCard from 'src/components/player/PlayerCard';
import { Player } from 'src/types';

const defaultTheme = createTheme();

export async function getServerSideProps() {
    const listPlayers = process.env.APP_BASE_URL + '/api/get-players';
    const playersResponse: Player[] = await (await fetch(listPlayers)).json()
    return {
        props: {
            players: playersResponse
        }
    }
}

interface PlayerListProps {
    players: Player[]
}

export default function viewPlayers({ players }: PlayerListProps) {

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <TopBar title="Scored song list" />
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
                        <Grid container spacing={3}>
                            {players.map((player, idx) =>
                                <Grid item xs={12} md={4} lg={3} key={idx}>
                                    <PlayerCard player={player} />
                                </Grid>
                            )}
                        </Grid>
                        <Footer sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
