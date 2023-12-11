import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Footer(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        Created by the{' '}
        <Link color="inherit" href="https://www.scylladb.com/">
          ScyllaDB
        </Link>{' '}
        Team for educational purposes
      </Typography>
    );
}