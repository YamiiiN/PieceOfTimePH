import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ProductCard() {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/productdetails');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
        flexWrap: 'wrap',
      }}
    >
      <Card
        onClick={handleCardClick}
        sx={{
          maxWidth: '260px',
          borderRadius: 3,
          backgroundColor: '#EFECEA',
          marginTop: 5,
          height: '350px',
          marginBottom: 5,
          overflow: 'hidden',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <CardMedia
          component="img"
          height="280px"
          image="https://pngimg.com/uploads/watches/watches_PNG9863.png"
          alt="Nature"
          sx={{
            maxWidth: '260px',
            borderRadiusTop: 3,
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              opacity: 1,
            },
          }}
        />
        <CardContent
          sx={{
            margin: 2,
            padding: 0,
            fontSize: '8px',
          }}
        >
          <Typography
            component="div"
            sx={{
              fontSize: '13px',
              fontFamily: 'Poppins, sans-serif',
              transition: 'color 0.3s ease',
            }}
          >
            Rolex
          </Typography>
          <Typography
            component="div"
            sx={{
              fontSize: '13px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 'bold',
              transition: 'color 0.3s ease',
            }}
          >
            Daytona
          </Typography>
        </CardContent>
      </Card>

      <Card
        onClick={handleCardClick}
        sx={{
          maxWidth: '260px',
          borderRadius: 3,
          backgroundColor: '#EFECEA',
          marginTop: 5,
          height: '350px',
          marginBottom: 5,
          overflow: 'hidden',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <CardMedia
          component="img"
          height="280px"
          image="https://pngimg.com/uploads/watches/watches_PNG9863.png"
          alt="Nature"
          sx={{
            maxWidth: '260px',
            borderRadiusTop: 3,
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              opacity: 1,
            },
          }}
        />
        <CardContent
          sx={{
            margin: 2,
            padding: 0,
            fontSize: '8px',
          }}
        >
          <Typography
            component="div"
            sx={{
              fontSize: '13px',
              fontFamily: 'Poppins, sans-serif',
              transition: 'color 0.3s ease',
            }}
          >
            Rolex
          </Typography>
          <Typography
            component="div"
            sx={{
              fontSize: '13px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 'bold',
              transition: 'color 0.3s ease',
            }}
          >
            Daytona
          </Typography>
        </CardContent>
      </Card>

      <Card
        onClick={handleCardClick}
        sx={{
          maxWidth: '260px',
          borderRadius: 3,
          backgroundColor: '#EFECEA',
          marginTop: 5,
          height: '350px',
          marginBottom: 5,
          overflow: 'hidden',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <CardMedia
          component="img"
          height="280px"
          image="https://pngimg.com/uploads/watches/watches_PNG9863.png"
          alt="Nature"
          sx={{
            maxWidth: '260px',
            borderRadiusTop: 3,
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              opacity: 1,
            },
          }}
        />
        <CardContent
          sx={{
            margin: 2,
            padding: 0,
            fontSize: '8px',
          }}
        >
          <Typography
            component="div"
            sx={{
              fontSize: '13px',
              fontFamily: 'Poppins, sans-serif',
              transition: 'color 0.3s ease',
            }}
          >
            Rolex
          </Typography>
          <Typography
            component="div"
            sx={{
              fontSize: '13px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 'bold',
              transition: 'color 0.3s ease',
            }}
          >
            Daytona
          </Typography>
        </CardContent>
      </Card>

      <Card
        onClick={handleCardClick}
        sx={{
          maxWidth: '260px',
          borderRadius: 3,
          backgroundColor: '#EFECEA',
          marginTop: 5,
          height: '350px',
          marginBottom: 5,
          overflow: 'hidden',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <CardMedia
          component="img"
          height="280px"
          image="https://pngimg.com/uploads/watches/watches_PNG9863.png"
          alt="Nature"
          sx={{
            maxWidth: '260px',
            borderRadiusTop: 3,
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              opacity: 1,
            },
          }}
        />
        <CardContent
          sx={{
            margin: 2,
            padding: 0,
            fontSize: '8px',
          }}
        >
          <Typography
            component="div"
            sx={{
              fontSize: '13px',
              fontFamily: 'Poppins, sans-serif',
              transition: 'color 0.3s ease',
            }}
          >
            Rolex
          </Typography>
          <Typography
            component="div"
            sx={{
              fontSize: '13px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 'bold',
              transition: 'color 0.3s ease',
            }}
          >
            Daytona
          </Typography>
        </CardContent>
      </Card>

      <Card
        onClick={handleCardClick}
        sx={{
          maxWidth: '260px',
          borderRadius: 3,
          backgroundColor: '#EFECEA',
          marginTop: 5,
          height: '350px',
          marginBottom: 5,
          overflow: 'hidden',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <CardMedia
          component="img"
          height="280px"
          image="https://pngimg.com/uploads/watches/watches_PNG9863.png"
          alt="Nature"
          sx={{
            maxWidth: '260px',
            borderRadiusTop: 3,
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              opacity: 1,
            },
          }}
        />
        <CardContent
          sx={{
            margin: 2,
            padding: 0,
            fontSize: '8px',
          }}
        >
          <Typography
            component="div"
            sx={{
              fontSize: '13px',
              fontFamily: 'Poppins, sans-serif',
              transition: 'color 0.3s ease',
            }}
          >
            Rolex
          </Typography>
          <Typography
            component="div"
            sx={{
              fontSize: '13px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 'bold',
              transition: 'color 0.3s ease',
            }}
          >
            Daytona
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
