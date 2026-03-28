import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { width } from '@mui/system';

interface DataProps {
  data: any;
}

export default function ModalCard({ data }: DataProps) {
  return (
    <Card
      sx={{
        width: { xs: 300, sm: 380 },
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 255, 255, 0.1)',
        borderRadius: '12px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 15px 50px 0 rgba(0, 255, 255, 0.2), 0 0 30px rgba(255, 0, 255, 0.1)',
          borderColor: 'rgba(0, 255, 255, 0.3)',
          '& #image': {
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      <Link
        href={`https://${data.site}`}
        sx={{
          color: 'inherit',
          padding: 0,
          textAlign: 'left',
          textTransform: 'none',
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          width: '100%',
        }}
        target="_blank"
        variant="subtitle1"
      >
        <CardMedia
          component="img"
          alt="Page image"
          id="image"
          image={data.imageUrl}
          loading="lazy"
          sx={{
            width: '100%',
            height: 220,
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        <CardContent
          sx={{
            flex: 1,
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4))',
            backdropFilter: 'blur(4px)',
            padding: '12px 16px !important', // MUI adds extra bottom padding by default
            boxSizing: 'border-box',
            width: '100%',
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              marginBottom: 1,
              background: 'linear-gradient(90deg, #00ffff, #ff00ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {data.name}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle2"
            component="div"
            sx={{
              color: 'rgba(0, 255, 255, 0.8)',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: 1,
              transition: 'color 0.3s ease',
              '&:hover': {
                color: '#00ffff',
              },
            }}
          >
            {data.site}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.85rem',
              lineHeight: 1.6,
            }}
          >
            {data.description}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}