import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ButtonBase } from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >

  </Box>
);

// const card = (

// );

export default function OutlinedCard(props) {
  return (
    <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined"> 
          <CardContent className='cardcontent' id={props.item.id}>
            <Typography variant="h5" component="div" >
              {props.item.first_name} {props.item.last_name}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {props.item.email}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {props.item.gender}
            </Typography>
            <Typography variant="body2">

              {props.item.available ? "Available" : "Not Available"}
              <br />

            </Typography>
          </CardContent>
          <CardActions>
            <Typography sx={{ mb: 1.5 }} color="primary">
              {props.item.domain}
            </Typography>
          </CardActions>

        </Card>
    </Box>
  );
}