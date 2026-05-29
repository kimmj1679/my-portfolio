import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GitHubIcon from '@mui/icons-material/GitHub';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const GITHUB_URL = 'https://github.com/kimmj1679';
// 이력서 PDF를 public/resume.pdf 에 넣으면 자동 연결됩니다
const RESUME_URL = '/my-portfolio/resume.pdf';

// 타이핑 텍스트: 구체적인 기술명 중심으로 교체
const TYPING_TEXTS = ['React & Python 개발자', 'AI 활용 빌더', '풀스택 웹 개발자'];

// 기술 스택 배지 목록
const TECH_STACK = ['React', 'Python', 'JavaScript', 'Supabase', 'CSS'];

const TYPING_SPEED = 100;
const ERASING_SPEED = 55;
const PAUSE_DURATION = 2200;

/**
 * 타이핑 애니메이션 커스텀 훅
 * @param {string[]} texts - 순환할 텍스트 배열
 */
function useTypingEffect(texts) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const id = setTimeout(() => {
        setIsPaused(false);
        setIsTyping(false);
      }, PAUSE_DURATION);
      return () => clearTimeout(id);
    }

    const currentText = texts[textIndex];

    if (isTyping) {
      if (displayText.length < currentText.length) {
        const id = setTimeout(
          () => setDisplayText(currentText.slice(0, displayText.length + 1)),
          TYPING_SPEED
        );
        return () => clearTimeout(id);
      }
      setIsPaused(true);
      return;
    }

    if (displayText.length > 0) {
      const id = setTimeout(
        () => setDisplayText(displayText.slice(0, -1)),
        ERASING_SPEED
      );
      return () => clearTimeout(id);
    }
    setTextIndex((prev) => (prev + 1) % texts.length);
    setIsTyping(true);
  }, [displayText, textIndex, isTyping, isPaused, texts]);

  return displayText;
}

/**
 * 파티클 캔버스 배경 컴포넌트
 */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      size: Math.random() * 1.8 + 0.5,
      opacity: Math.random() * 0.35 + 0.1,
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 46, 46, ${p.opacity})`;
        ctx.fill();
      });

      particles.forEach((p1, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 46, 46, ${0.07 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={ canvasRef }
      aria-hidden='true'
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}

function HeroSection() {
  const displayText = useTypingEffect(TYPING_TEXTS);

  return (
    <Box
      component='section'
      aria-label='소개 섹션'
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg-primary)',
        borderBottom: '1px solid var(--color-border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <ParticleCanvas />

      <Container maxWidth='md' sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center' }}>

          {/* 경력 레벨 배지 — "HELLO, I AM" 제거, 실질 정보로 교체 */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.5,
              mb: 3,
              px: 2,
              py: 0.6,
              border: '1px solid var(--color-border)',
              borderRadius: 10,
              backgroundColor: 'rgba(255,255,255,0.03)',
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                backgroundColor: '#4CAF50',
                boxShadow: '0 0 8px #4CAF50',
                animation: 'pulse 2s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.4 },
                },
              }}
              aria-hidden='true'
            />
            <Typography
              sx={{
                color: 'var(--color-text-muted)',
                fontSize: { xs: '0.68rem', md: '0.75rem' },
                letterSpacing: 3,
                fontWeight: 600,
              }}
            >
              신입 · 풀스택 개발자 · 구직 중
            </Typography>
          </Box>

          {/* 이름 */}
          <Typography
            variant='h1'
            sx={{
              color: 'var(--color-text-primary)',
              fontSize: { xs: '2.8rem', sm: '3.8rem', md: '5rem', lg: '6rem' },
              fontWeight: 900,
              lineHeight: 1.05,
              mb: 2,
              letterSpacing: { xs: -1, md: -2 },
            }}
          >
            김명준
            <Box
              component='span'
              sx={{
                color: 'var(--color-primary)',
                textShadow: '0 0 20px rgba(255,46,46,0.6), 0 0 40px rgba(255,46,46,0.25)',
              }}
            >
              .
            </Box>
          </Typography>

          {/* 타이핑 애니메이션 — 구체적인 기술명으로 교체 */}
          <Box
            sx={{
              minHeight: { xs: '2.8rem', md: '3.8rem' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <Typography
              component='span'
              aria-live='polite'
              aria-label={ `현재 직무: ${displayText}` }
              sx={{
                color: 'var(--color-primary)',
                fontSize: { xs: '1.4rem', md: '2.2rem' },
                fontWeight: 700,
                textShadow: '0 0 18px rgba(255,46,46,0.55)',
                fontFamily: 'monospace',
              }}
            >
              { displayText }
              <Box
                component='span'
                aria-hidden='true'
                sx={{
                  display: 'inline-block',
                  width: { xs: '2px', md: '3px' },
                  height: { xs: '1.4rem', md: '2rem' },
                  backgroundColor: 'var(--color-primary)',
                  ml: '3px',
                  verticalAlign: 'middle',
                  boxShadow: '0 0 8px rgba(255,46,46,0.9)',
                  animation: 'blink 1s step-end infinite',
                  '@keyframes blink': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0 },
                  },
                }}
              />
            </Typography>
          </Box>

          {/* 서브텍스트 — 구체적인 기술명 + 실증적 표현으로 교체 */}
          <Typography
            sx={{
              color: 'var(--color-text-secondary)',
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              lineHeight: 1.9,
              mb: 5,
              maxWidth: 480,
              mx: 'auto',
            }}
          >
            <Box
              component='span'
              sx={{ color: 'var(--color-text-primary)', fontWeight: 600 }}
            >
              React, Python, Supabase
            </Box>
            로 실제 서비스를 설계하고 직접 배포했습니다.{' '}
            <Box
              component='span'
              sx={{ color: 'var(--color-primary)', fontWeight: 600 }}
            >
              AI를 도구로 활용
            </Box>
            해 빠르게 제품을 만듭니다.
          </Typography>

          {/* CTA 버튼 그룹 */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap',
              alignItems: 'center',
              mb: 4,
            }}
          >
            {/* 1순위: 프로젝트 보기 */}
            <Button
              variant='contained'
              component={ Link }
              to='/projects'
              size='large'
              aria-label='프로젝트 목록 페이지로 이동'
              sx={{
                backgroundColor: 'var(--color-primary)',
                color: '#fff',
                px: { xs: 3.5, md: 4.5 },
                py: 1.5,
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontWeight: 700,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'var(--color-primary-dark)',
                  boxShadow: '0 0 24px rgba(255,46,46,0.55)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              프로젝트 보기
            </Button>

            {/* 2순위: 이력서 다운로드 — 보조 버튼 가시성 개선 (레드 테두리) */}
            <Button
              variant='outlined'
              component='a'
              href={ RESUME_URL }
              download='김명준_이력서.pdf'
              target='_blank'
              rel='noopener noreferrer'
              size='large'
              startIcon={ <FileDownloadIcon /> }
              aria-label='이력서 PDF 다운로드'
              sx={{
                color: 'var(--color-primary)',
                borderColor: 'var(--color-primary)',
                px: { xs: 3, md: 4 },
                py: 1.5,
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontWeight: 600,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255,46,46,0.08)',
                  borderColor: 'var(--color-primary)',
                  boxShadow: '0 0 16px rgba(255,46,46,0.25)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              이력서 보기
            </Button>

            {/* 3순위: GitHub 아이콘 링크 */}
            <Tooltip title='GitHub 프로필 보기' arrow>
              <IconButton
                component='a'
                href={ GITHUB_URL }
                target='_blank'
                rel='noopener noreferrer'
                aria-label='GitHub 프로필 새 탭에서 열기'
                sx={{
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 1,
                  p: 1.4,
                  '&:hover': {
                    color: 'var(--color-text-primary)',
                    borderColor: 'var(--color-text-secondary)',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <GitHubIcon fontSize='medium' />
              </IconButton>
            </Tooltip>
          </Box>

          {/* 기술 스택 한 줄 — 텍스트 배지로 역량 즉시 전달 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: { xs: 1, md: 0 },
            }}
            aria-label='주요 기술 스택'
          >
            { TECH_STACK.map((tech, index) => (
              <Box
                key={ tech }
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Typography
                  sx={{
                    color: 'var(--color-text-muted)',
                    fontSize: { xs: '0.72rem', md: '0.78rem' },
                    letterSpacing: 1.5,
                    fontWeight: 500,
                    fontFamily: 'monospace',
                    px: { xs: 0, md: 1.5 },
                    transition: 'color 0.2s ease',
                    cursor: 'default',
                    '&:hover': { color: 'var(--color-text-secondary)' },
                  }}
                >
                  { tech }
                </Typography>
                { index < TECH_STACK.length - 1 && (
                  <Box
                    aria-hidden='true'
                    sx={{
                      width: 3,
                      height: 3,
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-border)',
                      display: { xs: 'none', md: 'block' },
                    }}
                  />
                ) }
              </Box>
            )) }
          </Box>

        </Box>
      </Container>

      {/* 스크롤 인디케이터 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.3,
          animation: 'bounceDown 2s ease-in-out infinite',
          '@keyframes bounceDown': {
            '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
            '50%': { transform: 'translateX(-50%) translateY(8px)' },
          },
          cursor: 'default',
          userSelect: 'none',
        }}
        aria-hidden='true'
      >
        <Typography sx={{ fontSize: '0.6rem', letterSpacing: 3, color: 'var(--color-text-muted)' }}>
          SCROLL
        </Typography>
        <KeyboardArrowDownIcon sx={{ fontSize: '1.1rem', color: 'var(--color-primary)', opacity: 0.8 }} />
      </Box>
    </Box>
  );
}

export default HeroSection;
