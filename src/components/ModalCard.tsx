import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
interface DataProps {
  data: any;
}

export default function ModalCard({ data }: DataProps) {
  //destructuring data
  //  const { name, site, description, imageUrl } = data;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="Page image"
        height="170"
        image={data.imageUrl}
        loading="lazy"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {data.name}
        </Typography>
        <Typography gutterBottom variant="subtitle1" component="div">
          <Link
            href={`https://${data.site}`}
            sx={{
              color: 'black',
              padding: 0,
              textAlign: 'left',
              textTransform: 'lowercase',
              '&:hover': {
                color: 'yellow',
                fontWeight: 'bold',
              },
            }}
            target="_blank"
            underline="hover"
            variant="subtitle1"
          >
            {data.site}
            {console.log(data.site)}
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
