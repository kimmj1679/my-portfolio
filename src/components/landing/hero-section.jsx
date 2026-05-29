import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const TYPING_TEXTS = ['풀스택 개발자', 'AI 개발자', '문제 해결사'];
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
 * 레드 파티클과 연결선을 Canvas API로 렌더링
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

          {/* 인사말 */}
          <Typography
            variant='overline'
            sx={{
              color: 'var(--color-text-muted)',
              fontSize: { xs: '0.7rem', md: '0.85rem' },
              letterSpacing: 5,
              mb: 3,
              display: 'block',
            }}
          >
            HELLO, I AM
          </Typography>

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

          {/* 타이핑 애니메이션 영역 */}
          <Box
            sx={{
              minHeight: { xs: '2.8rem', md: '3.8rem' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 4,
            }}
          >
            <Typography
              component='span'
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

          {/* 서브 설명 */}
          <Typography
            sx={{
              color: 'var(--color-text-secondary)',
              fontSize: { xs: '0.95rem', md: '1.1rem' },
              lineHeight: 2,
              mb: 5,
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            Frontend부터{' '}
            <Box
              component='span'
              sx={{
                color: 'var(--color-primary)',
                fontWeight: 700,
                textShadow: '0 0 10px rgba(255,46,46,0.4)',
              }}
            >
              AI
            </Box>
            까지, 필요한 기술을 빠르게 습득하고{' '}
            <Box
              component='span'
              sx={{
                color: 'var(--color-primary)',
                fontWeight: 700,
                textShadow: '0 0 10px rgba(255,46,46,0.4)',
              }}
            >
              바로 적용
            </Box>
            합니다.
          </Typography>

          {/* CTA 버튼 */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant='contained'
              component={ Link }
              to='/projects'
              size='large'
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
            <Button
              variant='outlined'
              component={ Link }
              to='/about'
              size='large'
              sx={{
                color: 'var(--color-text-secondary)',
                borderColor: 'var(--color-border)',
                px: { xs: 3.5, md: 4.5 },
                py: 1.5,
                fontSize: { xs: '0.9rem', md: '1rem' },
                borderRadius: 1,
                '&:hover': {
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)',
                  backgroundColor: 'rgba(255,46,46,0.05)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              소개 보기
            </Button>
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
      >
        <Typography
          sx={{ fontSize: '0.6rem', letterSpacing: 3, color: 'var(--color-text-muted)' }}
        >
          SCROLL
        </Typography>
        <KeyboardArrowDownIcon sx={{ fontSize: '1.1rem', color: 'var(--color-primary)', opacity: 0.8 }} />
      </Box>
    </Box>
  );
}

export default HeroSection;
