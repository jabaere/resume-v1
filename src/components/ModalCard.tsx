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
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: '0px 4px 30px 3px rgba(0, 2, 0,0.71)',
        '&:hover': {
          transform: 'scale(0.98)',
          transition: 'all 0.2s ease-in 0.3s',
          delay: 'hidden',
          boxShadow: '0px 4px 30px 3px rgba(254, 231, 0,0.71)',
        },
      }}
    >
      <Link
        href={`https://${data.site}`}
        sx={{
          color: 'black',
          padding: 0,
          textAlign: 'left',
          textTransform: 'none',
          '.dd:hover': {
            color: 'yellow',
            fontWeight: 'bold',
          },
        }}
        target="_blank"
        underline="hover"
        variant="subtitle1"
      >
        <CardMedia
          component="img"
          alt="Page image"
          height="170"
          image={data.imageUrl}
          loading="lazy"
          id="image"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {data.name}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            className="dd"
          >
            {data.site}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}
