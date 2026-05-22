import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { supabase } from '../lib/supabase.js';
import ProjectCard from '../components/ui/project-card.jsx';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order');
      if (data) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
        py: { xs: 6, md: 10 },
        backgroundColor: 'var(--color-bg-primary)',
      }}
    >
      <Container maxWidth='md'>
        {/* 헤더 */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
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
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            전체 프로젝트
          </Typography>
          <Typography
            sx={{
              color: 'var(--color-text-secondary)',
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.8,
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            기획부터 배포까지 직접 구현한 모든 프로젝트입니다.
          </Typography>
        </Box>

        {/* 프로젝트 목록 */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: 'var(--color-primary)' }} />
          </Box>
        ) : projects.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography sx={{ color: 'var(--color-text-muted)' }}>
              등록된 프로젝트가 없습니다.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
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
      </Container>
    </Box>
  );
}

export default ProjectsPage;
