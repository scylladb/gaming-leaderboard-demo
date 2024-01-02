import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { Player } from 'src/types';

export default function PlayerCard({ player }: { player: Player }) {
    console.log(player);
    const url = `/players/${player.player_id}`;
    const avatarUrl = `https://github.com/${player.player_id}.png`
    return (
        <Card>
            <Image
                alt={player.name + " avatar "}
                src={avatarUrl}
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
                    {player.name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button href={url} size="small">Player Profile</Button>
            </CardActions>
        </Card>
    );
}
