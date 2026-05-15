import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function AboutSection() {
  return (
    <Box
      component='section'
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <Container maxWidth='md'>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant='overline'
            sx={{
              color: 'var(--color-primary)',
              fontSize: { xs: '0.75rem', md: '0.875rem' },
              letterSpacing: 4,
              mb: 2,
              display: 'block',
            }}
          >
            ABOUT ME
          </Typography>
          <Typography
            variant='h3'
            sx={{
              color: 'var(--color-text-primary)',
              fontSize: { xs: '1.5rem', md: '2rem' },
              lineHeight: 1.6,
              mb: 2,
            }}
          >
            여기는 About Me 섹션입니다.
          </Typography>
          <Typography
            sx={{
              color: 'var(--color-text-secondary)',
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.8,
              mb: 4,
            }}
          >
            간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.
          </Typography>
          <Button
            variant='outlined'
            component={Link}
            to='/about'
            sx={{
              color: 'var(--color-primary)',
              borderColor: 'var(--color-primary)',
              '&:hover': {
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-text-primary)',
              },
              px: 4,
              py: 1.5,
            }}
          >
            더 알아보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutSection;
