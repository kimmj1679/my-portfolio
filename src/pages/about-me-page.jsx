import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function AboutMePage() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 4, md: 8 },
        backgroundColor: 'var(--color-bg-primary)',
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
            variant='h4'
            sx={{
              color: 'var(--color-text-primary)',
              fontSize: { xs: '1.5rem', md: '2rem' },
              mb: 3,
            }}
          >
            About Me 페이지가 개발될 공간입니다.
          </Typography>
          <Typography
            sx={{
              color: 'var(--color-text-secondary)',
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.8,
            }}
          >
            상세한 자기소개가 들어갈 예정입니다.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutMePage;
