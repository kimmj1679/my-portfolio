import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function ProjectsSection() {
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
        <Box sx={{ textAlign: 'center', mb: 6 }}>
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
            PROJECTS
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
            여기는 Projects 섹션입니다.
          </Typography>
          <Typography
            sx={{
              color: 'var(--color-text-secondary)',
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.8,
              mb: 6,
            }}
          >
            대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다.
          </Typography>
        </Box>
        <Grid container spacing={3} justifyContent='center'>
          { [1, 2, 3].map((n) => (
            <Grid key={ n } size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  border: '1px solid var(--color-border)',
                  height: 180,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography
                    sx={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}
                  >
                    프로젝트 { n } 썸네일 예정
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )) }
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Button
            variant='outlined'
            component={ Link }
            to='/projects'
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
            더 보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default ProjectsSection;
