import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import SchoolIcon from '@mui/icons-material/School';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import GitHubIcon from '@mui/icons-material/GitHub';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component="a" href="/">
      <ListItemIcon>
        <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary="All Played Tracks" />
    </ListItemButton>
    <ListItemButton component="a" href="/players">
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Players" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Developer resources
    </ListSubheader>
    <ListItemButton component="a" href="https://github.com/scylladb/leaderboard-demo">
      <ListItemIcon>
        <GitHubIcon />
      </ListItemIcon>
      <ListItemText primary="GitHub repo" />
    </ListItemButton>
    <ListItemButton component="a" href="https://docs.scylladb.com/stable/">
      <ListItemIcon>
        <ArticleIcon />
      </ListItemIcon>
      <ListItemText primary="ScyllaDB docs" />
    </ListItemButton>
  </React.Fragment>
);
