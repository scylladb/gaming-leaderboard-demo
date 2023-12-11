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


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export async function getServerSideProps() {
  const listVideosUrl = process.env.APP_BASE_URL + '/api/list-tracks';
  const videosResponse: Track[] = await (await fetch(listVideosUrl)).json()
  return {
    props: {
      tracks: videosResponse
    }
  }
}

interface AllTrackProps {
  tracks: Track[] 
}

export default function viewTracks({ tracks }: AllTrackProps) {
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <TopBar title="All videos"/>
        <SideBar/>
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
              {tracks.map((track) =>
                <Grid item xs={12} md={4} lg={3} key={track.track_id}>
                  <TrackCard track={track}></TrackCard>
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
