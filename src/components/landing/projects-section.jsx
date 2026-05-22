import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase.js';
import ProjectCard from '../ui/project-card.jsx';

function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order')
        .limit(3);
      if (data) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

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
        {/* 헤더 */}
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
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 700,
              mb: 1.5,
            }}
          >
            대표 프로젝트
          </Typography>
          <Typography
            sx={{
              color: 'var(--color-text-secondary)',
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.8,
            }}
          >
            직접 기획하고 개발한 프로젝트들입니다.
          </Typography>
        </Box>

        {/* 프로젝트 목록 */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: 'var(--color-primary)' }} />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {projects.map(project => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                techStack={project.tech_stack}
                detailUrl={project.detail_url}
                githubUrl={project.github_url}
              />
            ))}
          </Box>
        )}

        {/* 더 보기 버튼 */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant='outlined'
            component={Link}
            to='/projects'
            endIcon={<ArrowForwardIcon />}
            sx={{
              color: 'var(--color-primary)',
              borderColor: 'var(--color-primary)',
              px: 4,
              py: 1.5,
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'var(--color-primary)',
                color: '#fff',
                borderColor: 'var(--color-primary)',
              },
            }}
          >
            모든 프로젝트 보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default ProjectsSection;
