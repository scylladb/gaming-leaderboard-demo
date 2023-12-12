import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Track } from 'src/types';

type LeaderboardTrackCardProps = {
    track: Track
}

export default function LeaderboardTrackCard({ track }: LeaderboardTrackCardProps) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' }}>
        <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={track.cover_url}
        alt={`${track.album} album cover`}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {track.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {track.album}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Played: 123 times
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}