import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Footer from "src/components/Footer";
import SideBar from "src/components/menu/SideBar";
import TopBar from "src/components/menu/TopBar";
import TrackCard from 'src/components/TrackCard';
import { Track } from 'src/types';

const userId = "scylla-user"

export async function getServerSideProps(context) {
    const progress = context.query.progress ?? 0
    const trackId = context.params.trackId

    let response = await fetch(process.env.APP_BASE_URL + `/api/leaderboard/${trackId}`);
    let track: Track = await response.json();

    return { props: track }
}

const defaultTheme = createTheme();

export default function TrackLeaderboard(video: Track) {

    return (
    <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopBar title="Watch video" />
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
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <Typography variant="h4" component="h1">{video.title}</Typography>
                    
                    </Box>
                </Container>
            </Box>
        </Box>
    </ThemeProvider>
    );
}
