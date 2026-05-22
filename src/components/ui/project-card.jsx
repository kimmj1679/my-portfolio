import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';

/**
 * ProjectCard 컴포넌트
 *
 * Props:
 * @param {string} title - 프로젝트 제목 [Required]
 * @param {string} description - 프로젝트 설명 [Required]
 * @param {string[]} techStack - 기술 스택 배열 [Required]
 * @param {string} detailUrl - 배포 사이트 URL [Optional]
 * @param {string} githubUrl - GitHub 저장소 URL [Optional]
 */
function ProjectCard({ title, description, techStack = [], detailUrl, githubUrl }) {
  const thumbnailUrl = detailUrl
    ? `https://image.thum.io/get/width/800/crop/450/${detailUrl}`
    : null;

  return (
    <Card
      sx={{
        bgcolor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        '&:hover': {
          borderColor: 'var(--color-primary)',
          boxShadow: '0 4px 24px rgba(255,0,0,0.15)',
        },
      }}
    >
      {/* 썸네일 16:9 */}
      <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16/9', bgcolor: 'var(--color-bg-tertiary)', overflow: 'hidden' }}>
        {thumbnailUrl ? (
          <Box
            component='img'
            src={thumbnailUrl}
            alt={title}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={e => { e.target.style.display = 'none'; }}
          />
        ) : (
          <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant='caption' sx={{ color: 'var(--color-text-muted)' }}>미리보기 없음</Typography>
          </Box>
        )}
      </Box>

      {/* 카드 정보 */}
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant='h6'
          sx={{ color: 'var(--color-text-primary)', fontWeight: 700, mb: 1, fontSize: '1rem' }}
        >
          {title}
        </Typography>
        <Typography
          variant='body2'
          sx={{ color: 'var(--color-text-secondary)', mb: 2, lineHeight: 1.6 }}
        >
          {description}
        </Typography>

        {/* 기술 스택 */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2.5 }}>
          {techStack.map(tech => (
            <Chip
              key={tech}
              label={tech}
              size='small'
              sx={{
                bgcolor: 'var(--color-bg-tertiary)',
                color: 'var(--color-accent)',
                border: '1px solid var(--color-border)',
                fontSize: '0.7rem',
                height: 24,
              }}
            />
          ))}
        </Box>

        {/* 버튼 */}
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          {detailUrl && (
            <Button
              variant='contained'
              size='small'
              href={detailUrl}
              target='_blank'
              rel='noopener noreferrer'
              startIcon={<OpenInNewIcon sx={{ fontSize: 15 }} />}
              sx={{
                bgcolor: 'var(--color-primary)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.8rem',
                px: 2,
                '&:hover': { bgcolor: 'var(--color-button-hover)' },
              }}
            >
              Live Demo
            </Button>
          )}
          {githubUrl && (
            <Button
              variant='outlined'
              size='small'
              href={githubUrl}
              target='_blank'
              rel='noopener noreferrer'
              startIcon={<GitHubIcon sx={{ fontSize: 15 }} />}
              sx={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-secondary)',
                fontSize: '0.8rem',
                px: 2,
                '&:hover': {
                  borderColor: 'var(--color-text-primary)',
                  color: 'var(--color-text-primary)',
                  bgcolor: 'transparent',
                },
              }}
            >
              GitHub
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
