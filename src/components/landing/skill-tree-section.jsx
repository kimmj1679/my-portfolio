import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

function SkillTreeSection() {
  return (
    <Box
      component='section'
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'var(--color-bg-tertiary)',
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
            SKILL TREE
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
            여기는 Skill Tree 섹션입니다.
          </Typography>
          <Typography
            sx={{
              color: 'var(--color-text-secondary)',
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.8,
            }}
          >
            기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
          </Typography>
        </Box>
        <Grid container spacing={2} justifyContent='center'>
          { ['Frontend', 'Backend', 'Tools'].map((category) => (
            <Grid key={ category } size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  textAlign: 'center',
                  height: '100%',
                }}
              >
                <CardContent sx={{ py: 4 }}>
                  <Typography
                    variant='h6'
                    sx={{ color: 'var(--color-accent)', mb: 1 }}
                  >
                    { category }
                  </Typography>
                  <Typography
                    sx={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}
                  >
                    기술 목록 예정
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )) }
        </Grid>
      </Container>
    </Box>
  );
}

export default SkillTreeSection;
