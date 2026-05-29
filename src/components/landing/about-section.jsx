import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/portfolio-context';
import { CATEGORY_COLORS } from '../../utils/skill-utils';

const AboutSection = memo(function AboutSection() {
  // homeData는 useMemo로 계산된 값 — 데이터 변경 시에만 리렌더
  const { homeData } = usePortfolio();
  const { content, skills, basicInfo } = homeData;
  const devStory = content.find((c) => c.id === 'dev-story');

  return (
    <Box
      component='section'
      aria-labelledby='about-section-heading'
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <Container maxWidth='md'>
        <Typography
          variant='overline'
          sx={{
            color: 'var(--color-primary)',
            fontSize: { xs: '0.75rem', md: '0.875rem' },
            letterSpacing: 4,
            mb: 4,
            display: 'block',
            textAlign: 'center',
          }}
          aria-hidden='true'
        >
          ABOUT ME
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 5 }}>
          {/* 개발 스토리 요약 */}
          <Box sx={{ flex: 1 }}>
            <Typography
              id='about-section-heading'
              variant='h2'
              sx={{
                color: 'var(--color-text-primary)',
                fontSize: { xs: '1.4rem', md: '1.8rem' },
                fontWeight: 700,
                mb: 2,
                lineHeight: 1.4,
              }}
            >
              { basicInfo.name }
            </Typography>

            { devStory && devStory.summary ? (
              <Typography
                sx={{
                  color: 'var(--color-text-secondary)',
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  lineHeight: 1.9,
                  mb: 3,
                  // 부드러운 전환
                  transition: 'opacity 0.4s ease',
                }}
              >
                { devStory.summary }
              </Typography>
            ) : (
              <Typography
                sx={{
                  color: 'var(--color-text-muted)',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  lineHeight: 1.8,
                  mb: 3,
                  fontStyle: 'italic',
                }}
              >
                About Me 탭에서 나의 개발 스토리를 작성하면 여기에 표시됩니다.
              </Typography>
            ) }

            {/* 상위 스킬 칩 */}
            <Box
              sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
              aria-label='주요 기술 스택'
            >
              { skills.map((skill) => {
                const color = CATEGORY_COLORS[skill.category] || '#AAAAAA';
                return (
                  <Chip
                    key={ skill.id }
                    label={ skill.name }
                    size='small'
                    aria-label={ `${skill.name} ${skill.level}%` }
                    sx={{
                      backgroundColor: `${color}22`,
                      color,
                      border: `1px solid ${color}44`,
                      fontSize: '0.75rem',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: `${color}33`,
                        transform: 'translateY(-1px)',
                      },
                    }}
                  />
                );
              }) }
            </Box>
          </Box>

          {/* 기본 정보 카드 */}
          <Card
            sx={{
              backgroundColor: 'var(--color-bg-tertiary)',
              border: '1px solid var(--color-border)',
              minWidth: { md: 220 },
              alignSelf: { md: 'flex-start' },
            }}
          >
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
              <Box component='dl' sx={{ m: 0 }}>
                { [
                  { label: '학력', value: basicInfo.education },
                  { label: '전공', value: basicInfo.major },
                  { label: '경력', value: basicInfo.experience },
                ].map(({ label, value }) => (
                  <Box key={ label } sx={{ mb: 1.8 }}>
                    <Typography
                      component='dt'
                      sx={{ color: 'var(--color-text-muted)', fontSize: '0.68rem', letterSpacing: 1.5, mb: 0.3 }}
                    >
                      { label.toUpperCase() }
                    </Typography>
                    <Typography
                      component='dd'
                      sx={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', m: 0 }}
                    >
                      { value || '-' }
                    </Typography>
                  </Box>
                )) }
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant='outlined'
            component={ Link }
            to='/about'
            aria-label='About Me 상세 페이지로 이동'
            sx={{
              color: 'var(--color-primary)',
              borderColor: 'var(--color-primary)',
              '&:hover': {
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-text-primary)',
              },
              px: 4,
              py: 1.5,
              transition: 'all 0.3s ease',
            }}
          >
            더 알아보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
});

export default AboutSection;
