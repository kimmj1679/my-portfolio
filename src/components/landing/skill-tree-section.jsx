import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import AnimatedProgressBar from '../ui/animated-progress-bar';
import { usePortfolio } from '../../context/portfolio-context';
import { CATEGORY_COLORS } from '../../utils/skill-utils';

function SkillTreeSection() {
  const { getHomeData } = usePortfolio();
  const { skills } = getHomeData();

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
            주요 기술 스택
          </Typography>
          <Typography
            sx={{
              color: 'var(--color-text-secondary)',
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.8,
            }}
          >
            지속적으로 학습하며 새로운 기술을 쌓아가고 있습니다.
          </Typography>
        </Box>

        <Grid container spacing={ 2 } sx={{ mb: 5 }}>
          { skills.map((skill) => {
            const color = CATEGORY_COLORS[skill.category] || '#AAAAAA';
            return (
              <Grid key={ skill.id } size={{ xs: 12, sm: 6 }}>
                <Card
                  sx={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    border: '1px solid var(--color-border)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: color,
                      boxShadow: `0 0 12px ${color}33`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                      <Typography sx={{ color: 'var(--color-text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>
                        { skill.name }
                      </Typography>
                      <Typography sx={{ color, fontSize: '0.82rem', fontWeight: 700 }}>
                        { skill.level }%
                      </Typography>
                    </Box>
                    <AnimatedProgressBar value={ skill.level } color={ color } height={ 6 } delay={ 200 } />
                  </CardContent>
                </Card>
              </Grid>
            );
          }) }
        </Grid>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant='outlined'
            component={ Link }
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
            전체 스킬 보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default SkillTreeSection;
