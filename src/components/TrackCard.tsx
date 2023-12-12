import { LinearProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { Track } from 'src/types';

export default function TrackCard({ track }: { track: Track }) {
  const url = `/leaderboard/${track.track_id}`;
  return (
    <Card>
      <Image
        alt= {track.title}
        src={track.cover_url}
        width={640}
        height={480}
        style={{
          maxWidth: '100%',
          height: '200px',
          objectFit: 'cover',
        }}
      />
    
      <CardContent>

        <Typography gutterBottom variant="h5" component="h5">
          {track.title}
        </Typography>
        <Typography gutterBottom component="p">
          Artist: {track.artist} 
        </Typography>
        <Typography gutterBottom component="p">
        Album: {track.album}
        </Typography>

      </CardContent>
      <CardActions>
        <Button href={url} size="small">Go for Song Leaderboard</Button>
      </CardActions>
    </Card>
  );
}
