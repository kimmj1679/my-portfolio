import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

/**
 * AnimatedProgressBar
 *
 * Props:
 * @param {number} value - 숙련도 퍼센트 (0~100) [Required]
 * @param {string} color - 프로그레스 바 색상 [Required]
 * @param {number} height - 바 높이(px) [Optional, 기본값: 8]
 * @param {number} delay - 애니메이션 시작 지연(ms) [Optional, 기본값: 100]
 * @param {string} ariaLabel - 스크린 리더용 레이블 [Optional]
 */
function AnimatedProgressBar({ value, color, height = 8, delay = 100, ariaLabel }) {
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  // value가 바뀌면 이미 화면에 보이는 경우 즉시 반영, 아직 안 보이면 진입 시 반영
  useEffect(() => {
    if (hasAnimated.current) {
      setProgress(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setProgress(value);
            hasAnimated.current = true;
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, delay]);

  return (
    <Box ref={ ref }>
      <LinearProgress
        variant='determinate'
        value={ progress }
        aria-label={ ariaLabel || `숙련도 ${value}%` }
        aria-valuenow={ progress }
        aria-valuemin={ 0 }
        aria-valuemax={ 100 }
        sx={{
          height,
          borderRadius: 4,
          backgroundColor: 'var(--color-border)',
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
            backgroundColor: color,
            transition: 'transform 1.1s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        }}
      />
    </Box>
  );
}

export default AnimatedProgressBar;
