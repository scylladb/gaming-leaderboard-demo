import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Player, Track } from 'src/types';

type PlayerProfileCardProps = {
    player: Player
}

export default function PlayerProfileCard({ player }: PlayerProfileCardProps) {
    const avatarUrl = `https://github.com/${player.player_id}.png`

    return (
        <Card sx={{ display: 'flex' }}>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={avatarUrl}
                alt={`${player.name} avatar`}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {player.name}
                    </Typography>

                </CardContent>
            </Box>
        </Card>
    );
}