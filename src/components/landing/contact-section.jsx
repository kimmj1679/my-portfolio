import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SendIcon from '@mui/icons-material/Send';
import { supabase } from '../../lib/supabase';

// ── 연락처 정보 ──────────────────────────────────────────
const CONTACT_INFO = [
  {
    id: 'email',
    icon: <EmailIcon />,
    label: 'Email',
    value: 'kimmj1679@gmail.com',
    href: 'mailto:kimmj1679@gmail.com',
  },
  {
    id: 'github',
    icon: <GitHubIcon />,
    label: 'GitHub',
    value: 'github.com/kimmj1679',
    href: 'https://github.com/kimmj1679',
  },
  {
    id: 'linkedin',
    icon: <LinkedInIcon />,
    label: 'LinkedIn',
    value: '프로필 보기',
    href: 'https://linkedin.com',
  },
];

const EMOJI_OPTIONS = ['👋', '😊', '🔥', '🚀', '💡', '✨', '💪', '🎉'];

const HOW_FOUND_OPTIONS = [
  { value: '', label: '선택하지 않음' },
  { value: '검색 엔진', label: '검색 엔진 (Google 등)' },
  { value: '지인 소개', label: '지인 소개' },
  { value: 'GitHub', label: 'GitHub' },
  { value: 'SNS', label: 'SNS' },
  { value: '기타', label: '기타' },
];

const EMPTY_FORM = {
  name: '',
  message: '',
  emoji: '👋',
  rating: 5,
  email: '',
  how_found: '',
};

// ── 별점 컴포넌트 ─────────────────────────────────────────
function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);

  return (
    <Box sx={{ display: 'flex', gap: 0.3 }} role='group' aria-label='별점 선택'>
      { [1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hovered || value);
        return (
          <Box
            key={ star }
            component='button'
            type='button'
            aria-label={ `별점 ${star}점` }
            onClick={ () => onChange(star) }
            onMouseEnter={ () => setHovered(star) }
            onMouseLeave={ () => setHovered(0) }
            sx={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              p: 0.2,
              color: filled ? '#FFB400' : 'var(--color-border)',
              fontSize: '1.3rem',
              lineHeight: 1,
              transition: 'color 0.15s ease, transform 0.15s ease',
              '&:hover': { transform: 'scale(1.2)' },
            }}
          >
            { filled ? <StarIcon fontSize='inherit' /> : <StarBorderIcon fontSize='inherit' /> }
          </Box>
        );
      }) }
    </Box>
  );
}

// ── 방명록 카드 ────────────────────────────────────────────
function GuestbookCard({ entry }) {
  const date = new Date(entry.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <Card
      sx={{
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        transition: 'border-color 0.2s ease',
        '&:hover': { borderColor: 'var(--color-text-muted)' },
      }}
    >
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <Typography sx={{ fontSize: '1.5rem', lineHeight: 1 }} aria-hidden='true'>
              { entry.emoji }
            </Typography>
            <Box>
              <Typography sx={{ color: 'var(--color-text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                { entry.name }
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.2 }} aria-label={ `별점 ${entry.rating}점` }>
                { [1, 2, 3, 4, 5].map((s) => (
                  <StarIcon
                    key={ s }
                    sx={{ fontSize: '0.75rem', color: s <= entry.rating ? '#FFB400' : 'var(--color-border)' }}
                    aria-hidden='true'
                  />
                )) }
              </Box>
            </Box>
          </Box>
          <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.72rem' }}>
            { date }
          </Typography>
        </Box>
        <Typography
          sx={{
            color: 'var(--color-text-secondary)',
            fontSize: '0.88rem',
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          { entry.message }
        </Typography>
        { entry.how_found && (
          <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.7rem', mt: 1 }}>
            via { entry.how_found }
          </Typography>
        ) }
      </CardContent>
    </Card>
  );
}

// ── 스켈레톤 로딩 ─────────────────────────────────────────
function GuestbookSkeleton() {
  return (
    <Grid container spacing={ 2 }>
      { [1, 2, 3].map((i) => (
        <Grid key={ i } size={{ xs: 12, md: 6 }}>
          <Card sx={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', gap: 1.2, mb: 1.5 }}>
                <Skeleton variant='circular' width={ 36 } height={ 36 } sx={{ bgcolor: 'var(--color-bg-tertiary)' }} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton width='40%' height={ 18 } sx={{ bgcolor: 'var(--color-bg-tertiary)', mb: 0.5 }} />
                  <Skeleton width='25%' height={ 14 } sx={{ bgcolor: 'var(--color-bg-tertiary)' }} />
                </Box>
              </Box>
              <Skeleton width='100%' height={ 14 } sx={{ bgcolor: 'var(--color-bg-tertiary)', mb: 0.5 }} />
              <Skeleton width='80%' height={ 14 } sx={{ bgcolor: 'var(--color-bg-tertiary)' }} />
            </CardContent>
          </Card>
        </Grid>
      )) }
    </Grid>
  );
}

// ── 메인 컴포넌트 ─────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = (message, severity = 'success') =>
    setSnackbar({ open: true, message, severity });

  // 방명록 목록 불러오기
  const fetchEntries = useCallback(async () => {
    const { data, error } = await supabase
      .from('guestbook')
      .select('id, name, message, emoji, rating, how_found, created_at')
      .order('created_at', { ascending: false })
      .limit(20);

    if (!error) setEntries(data || []);
    setIsLoading(false);
  }, []);

  useEffect(() => { fetchEntries(); }, [fetchEntries]);

  const handleChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  // 방명록 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;

    setIsSubmitting(true);
    const { error } = await supabase.from('guestbook').insert({
      name: form.name.trim(),
      message: form.message.trim(),
      emoji: form.emoji,
      rating: form.rating,
      email: form.email.trim() || null,
      how_found: form.how_found || null,
    });

    if (error) {
      showSnackbar('오류가 발생했습니다. 다시 시도해주세요.', 'error');
    } else {
      showSnackbar('방명록이 등록되었습니다! 감사합니다 😊');
      setForm(EMPTY_FORM);
      fetchEntries();
    }
    setIsSubmitting(false);
  };

  return (
    <Box
      component='section'
      aria-labelledby='contact-heading'
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'var(--color-bg-primary)',
      }}
    >
      <Container maxWidth='md'>

        {/* 섹션 헤더 */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant='overline'
            sx={{ color: 'var(--color-primary)', letterSpacing: 4, display: 'block', mb: 1.5 }}
            aria-hidden='true'
          >
            CONTACT
          </Typography>
          <Typography
            id='contact-heading'
            variant='h2'
            sx={{ color: 'var(--color-text-primary)', fontSize: { xs: '1.6rem', md: '2.2rem' }, fontWeight: 700, mb: 1.5 }}
          >
            함께 만들어가요
          </Typography>
          <Typography
            sx={{ color: 'var(--color-text-secondary)', fontSize: { xs: '0.95rem', md: '1rem' }, lineHeight: 1.8 }}
          >
            새로운 기회, 협업 제안, 혹은 간단한 인사도 환영합니다.
          </Typography>
        </Box>

        {/* ── 연락처 카드 ── */}
        <Grid container spacing={ 2 } sx={{ mb: 3 }}>
          { CONTACT_INFO.map((contact) => (
            <Grid key={ contact.id } size={{ xs: 12, sm: 4 }}>
              <Card
                component='a'
                href={ contact.href }
                target={ contact.id !== 'email' ? '_blank' : undefined }
                rel={ contact.id !== 'email' ? 'noopener noreferrer' : undefined }
                aria-label={ `${contact.label}: ${contact.value}` }
                sx={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    borderColor: 'var(--color-text-secondary)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  },
                }}
              >
                <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                    <Box sx={{ color: 'var(--color-text-muted)', display: 'flex' }} aria-hidden='true'>
                      { contact.icon }
                    </Box>
                    <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.72rem', letterSpacing: 1.5, fontWeight: 700 }}>
                      { contact.label }
                    </Typography>
                  </Box>
                  <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', wordBreak: 'break-all' }}>
                    { contact.value }
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )) }
        </Grid>

        {/* ── SNS 사각형 버튼 ── */}
        <Box sx={{ display: 'flex', gap: 1.5, mb: 8, flexWrap: 'wrap' }}>
          { CONTACT_INFO.map((contact) => (
            <Button
              key={ contact.id }
              component='a'
              href={ contact.href }
              target={ contact.id !== 'email' ? '_blank' : undefined }
              rel={ contact.id !== 'email' ? 'noopener noreferrer' : undefined }
              startIcon={ contact.icon }
              aria-label={ `${contact.label} 열기` }
              sx={{
                color: 'var(--color-text-secondary)',
                borderRadius: 1,
                border: '1px solid var(--color-border)',
                px: 2.5,
                py: 1,
                fontSize: '0.82rem',
                fontWeight: 600,
                backgroundColor: 'var(--color-bg-secondary)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: 'var(--color-text-primary)',
                  borderColor: 'var(--color-text-secondary)',
                  backgroundColor: 'var(--color-bg-tertiary)',
                },
              }}
            >
              { contact.label }
            </Button>
          )) }
        </Box>

        <Divider sx={{ borderColor: 'var(--color-border)', mb: 8 }} />

        {/* ── 방명록 섹션 ── */}
        <Box>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography
              variant='overline'
              sx={{ color: 'var(--color-primary)', letterSpacing: 4, display: 'block', mb: 1 }}
              aria-hidden='true'
            >
              GUESTBOOK
            </Typography>
            <Typography
              variant='h3'
              sx={{ color: 'var(--color-text-primary)', fontSize: { xs: '1.3rem', md: '1.7rem' }, fontWeight: 700 }}
            >
              방명록
            </Typography>
          </Box>

          {/* 방명록 작성 폼 */}
          <Card
            sx={{
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              mb: 5,
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography sx={{ color: 'var(--color-text-primary)', fontWeight: 700, fontSize: '0.95rem', mb: 3 }}>
                방명록 남기기
              </Typography>
              <Box component='form' onSubmit={ handleSubmit } noValidate>
                <Grid container spacing={ 2 }>

                  {/* 이름 */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label='이름 *'
                      value={ form.name }
                      onChange={ (e) => handleChange('name', e.target.value) }
                      fullWidth
                      size='small'
                      required
                      inputProps={{ maxLength: 30, 'aria-label': '이름 입력' }}
                      sx={ textFieldSx }
                    />
                  </Grid>

                  {/* 이메일 (비공개) */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label='이메일 (비공개 저장)'
                      value={ form.email }
                      onChange={ (e) => handleChange('email', e.target.value) }
                      fullWidth
                      size='small'
                      type='email'
                      inputProps={{ 'aria-label': '이메일 입력 (선택)' }}
                      sx={ textFieldSx }
                    />
                  </Grid>

                  {/* 이모지 선택 */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box>
                      <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', mb: 1 }}>
                        이모지 선택
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }} role='group' aria-label='이모지 선택'>
                        { EMOJI_OPTIONS.map((emoji) => (
                          <Box
                            key={ emoji }
                            component='button'
                            type='button'
                            aria-label={ `이모지 ${emoji} 선택` }
                            aria-pressed={ form.emoji === emoji }
                            onClick={ () => handleChange('emoji', emoji) }
                            sx={{
                              background: form.emoji === emoji
                                ? 'var(--color-primary)22'
                                : 'var(--color-bg-tertiary)',
                              border: form.emoji === emoji
                                ? '1px solid var(--color-primary)88'
                                : '1px solid var(--color-border)',
                              borderRadius: 1,
                              cursor: 'pointer',
                              fontSize: '1.3rem',
                              p: '6px 8px',
                              lineHeight: 1,
                              transition: 'all 0.15s ease',
                              '&:hover': { transform: 'scale(1.15)' },
                            }}
                          >
                            { emoji }
                          </Box>
                        )) }
                      </Box>
                    </Box>
                  </Grid>

                  {/* 별점 */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box>
                      <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', mb: 1 }}>
                        포트폴리오 별점
                      </Typography>
                      <StarRating value={ form.rating } onChange={ (v) => handleChange('rating', v) } />
                    </Box>
                  </Grid>

                  {/* 방문 경로 */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth size='small' sx={ formControlSx }>
                      <InputLabel>어떻게 오셨나요? (선택)</InputLabel>
                      <Select
                        value={ form.how_found }
                        label='어떻게 오셨나요? (선택)'
                        onChange={ (e) => handleChange('how_found', e.target.value) }
                      >
                        { HOW_FOUND_OPTIONS.map((opt) => (
                          <MenuItem key={ opt.value } value={ opt.value }>{ opt.label }</MenuItem>
                        )) }
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* 메시지 */}
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      label='메시지 *'
                      value={ form.message }
                      onChange={ (e) => handleChange('message', e.target.value) }
                      fullWidth
                      multiline
                      rows={ 3 }
                      required
                      inputProps={{ maxLength: 300, 'aria-label': '방명록 메시지 입력' }}
                      helperText={ `${form.message.length} / 300` }
                      sx={ textFieldSx }
                    />
                  </Grid>

                  {/* 제출 버튼 */}
                  <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      type='submit'
                      variant='contained'
                      disabled={ isSubmitting || !form.name.trim() || !form.message.trim() }
                      endIcon={ <SendIcon /> }
                      aria-label='방명록 등록'
                      sx={{
                        backgroundColor: 'var(--color-primary)',
                        '&:hover': { backgroundColor: 'var(--color-primary-dark)' },
                        '&.Mui-disabled': { backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-muted)' },
                        px: 3.5,
                        fontWeight: 700,
                      }}
                    >
                      { isSubmitting ? '등록 중...' : '남기기' }
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>

          {/* 방명록 목록 */}
          { isLoading ? (
            <GuestbookSkeleton />
          ) : entries.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '2rem', mb: 1.5 }} aria-hidden='true'>
                👋
              </Typography>
              <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                첫 번째 방명록을 남겨주세요!
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={ 2 }>
              { entries.map((entry) => (
                <Grid key={ entry.id } size={{ xs: 12, md: 6 }}>
                  <GuestbookCard entry={ entry } />
                </Grid>
              )) }
            </Grid>
          ) }
        </Box>
      </Container>

      <Snackbar
        open={ snackbar.open }
        autoHideDuration={ 3000 }
        onClose={ () => setSnackbar((s) => ({ ...s, open: false })) }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={ snackbar.severity }
          variant='filled'
          onClose={ () => setSnackbar((s) => ({ ...s, open: false })) }
          sx={
            snackbar.severity === 'success'
              ? { backgroundColor: '#1e3a1e', color: '#a5d6a7', border: '1px solid #4CAF5044' }
              : {}
          }
        >
          { snackbar.message }
        </Alert>
      </Snackbar>
    </Box>
  );
}

// ── 공통 스타일 상수 ────────────────────────────────────────
const textFieldSx = {
  '& .MuiOutlinedInput-root': {
    color: 'var(--color-text-secondary)',
    '& fieldset': { borderColor: 'var(--color-border)' },
    '&:hover fieldset': { borderColor: 'var(--color-text-muted)' },
    '&.Mui-focused fieldset': { borderColor: 'var(--color-primary)' },
  },
  '& .MuiInputLabel-root': { color: 'var(--color-text-muted)' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'var(--color-primary)' },
  '& .MuiFormHelperText-root': { color: 'var(--color-text-muted)' },
};

const formControlSx = {
  '& .MuiOutlinedInput-root': {
    color: 'var(--color-text-secondary)',
    '& fieldset': { borderColor: 'var(--color-border)' },
    '&:hover fieldset': { borderColor: 'var(--color-text-muted)' },
    '&.Mui-focused fieldset': { borderColor: 'var(--color-primary)' },
  },
  '& .MuiInputLabel-root': { color: 'var(--color-text-muted)' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'var(--color-primary)' },
  '& .MuiSelect-icon': { color: 'var(--color-text-muted)' },
};

export default ContactSection;
