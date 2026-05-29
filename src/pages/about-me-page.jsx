import { useState, useMemo, useCallback, memo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Slider from '@mui/material/Slider';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CheckIcon from '@mui/icons-material/Check';
import CodeIcon from '@mui/icons-material/Code';
import PaletteIcon from '@mui/icons-material/Palette';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import TerminalIcon from '@mui/icons-material/Terminal';
import AnimatedProgressBar from '../components/ui/animated-progress-bar';
import { usePortfolio } from '../context/portfolio-context';
import { CATEGORY_COLORS } from '../utils/skill-utils';

const SKILL_ICONS = {
  'HTML': <CodeIcon fontSize='small' />,
  'CSS': <PaletteIcon fontSize='small' />,
  'JavaScript': <FlashOnIcon fontSize='small' />,
  'React': <AutorenewIcon fontSize='small' />,
  'Python': <TerminalIcon fontSize='small' />,
};

/**
 * SkillCard
 *
 * Props:
 * @param {object} skill - 스킬 데이터 객체 [Required]
 */
const SkillCard = memo(function SkillCard({ skill }) {
  const color = CATEGORY_COLORS[skill.category] || '#AAAAAA';
  const icon = SKILL_ICONS[skill.name] || <CodeIcon fontSize='small' />;

  return (
    <Tooltip
      title={ skill.description || skill.name }
      arrow
      placement='top'
      enterDelay={ 400 }
    >
      <Card
        role='article'
        aria-label={ `${skill.name} 숙련도 ${skill.level}%` }
        sx={{
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
          transition: 'all 0.3s ease',
          cursor: 'default',
          height: '100%',
          '&:hover': {
            borderColor: color,
            boxShadow: `0 0 14px ${color}33`,
            transform: 'translateY(-3px)',
          },
          '&:focus-within': {
            borderColor: color,
            outline: `2px solid ${color}`,
            outlineOffset: 2,
          },
        }}
      >
        <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ color, display: 'flex', alignItems: 'center' }} aria-hidden='true'>
                { icon }
              </Box>
              <Typography sx={{ color: 'var(--color-text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>
                { skill.name }
              </Typography>
            </Box>
            <Chip
              label={ skill.category }
              size='small'
              sx={{
                backgroundColor: `${color}22`,
                color,
                border: `1px solid ${color}44`,
                fontSize: '0.68rem',
                height: 20,
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ flex: 1 }}>
              <AnimatedProgressBar
                value={ skill.level }
                color={ color }
                height={ 7 }
                ariaLabel={ `${skill.name} 숙련도` }
              />
            </Box>
            <Typography
              sx={{ color: 'var(--color-text-muted)', fontSize: '0.78rem', minWidth: 34, textAlign: 'right' }}
              aria-label={ `${skill.level}퍼센트` }
            >
              { skill.level }%
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Tooltip>
  );
});

/**
 * AddSkillDialog
 *
 * Props:
 * @param {boolean} isOpen - 다이얼로그 열림 여부 [Required]
 * @param {function} onClose - 닫기 핸들러 [Required]
 * @param {function} onAdd - 스킬 추가 핸들러 [Required]
 */
const AddSkillDialog = memo(function AddSkillDialog({ isOpen, onClose, onAdd }) {
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 50,
    category: 'Frontend',
    description: '',
  });

  const handleAdd = useCallback(() => {
    if (!newSkill.name.trim()) return;
    onAdd(newSkill);
    setNewSkill({ name: '', level: 50, category: 'Frontend', description: '' });
    onClose();
  }, [newSkill, onAdd, onClose]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && newSkill.name.trim()) handleAdd();
  }, [handleAdd, newSkill.name]);

  return (
    <Dialog
      open={ isOpen }
      onClose={ onClose }
      maxWidth='sm'
      fullWidth
      aria-labelledby='add-skill-dialog-title'
      PaperProps={{
        sx: {
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
        },
      }}
    >
      <DialogTitle id='add-skill-dialog-title' sx={{ color: 'var(--color-text-primary)', fontWeight: 700 }}>
        스킬 추가
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: '16px !important' }}>
        <TextField
          label='기술명'
          value={ newSkill.name }
          onChange={ (e) => setNewSkill({ ...newSkill, name: e.target.value }) }
          onKeyDown={ handleKeyDown }
          fullWidth
          size='small'
          placeholder='예: TypeScript'
          autoFocus
          inputProps={{ 'aria-label': '기술명 입력' }}
        />
        <FormControl fullWidth size='small'>
          <InputLabel id='category-select-label'>카테고리</InputLabel>
          <Select
            labelId='category-select-label'
            value={ newSkill.category }
            label='카테고리'
            onChange={ (e) => setNewSkill({ ...newSkill, category: e.target.value }) }
          >
            { Object.keys(CATEGORY_COLORS).map((cat) => (
              <MenuItem key={ cat } value={ cat }>{ cat }</MenuItem>
            )) }
          </Select>
        </FormControl>
        <Box>
          <Typography
            id='skill-level-label'
            sx={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', mb: 1 }}
          >
            숙련도:{' '}
            <Box component='span' sx={{ color: 'var(--color-primary)', fontWeight: 700 }}>
              { newSkill.level }%
            </Box>
          </Typography>
          <Slider
            value={ newSkill.level }
            onChange={ (_, val) => setNewSkill({ ...newSkill, level: val }) }
            min={ 0 }
            max={ 100 }
            step={ 5 }
            aria-labelledby='skill-level-label'
            sx={{ color: 'var(--color-primary)' }}
          />
        </Box>
        <TextField
          label='설명 (툴팁에 표시됩니다)'
          value={ newSkill.description }
          onChange={ (e) => setNewSkill({ ...newSkill, description: e.target.value }) }
          fullWidth
          size='small'
          multiline
          rows={ 2 }
          placeholder='예: 타입 안전성을 고려한 컴포넌트 개발'
          inputProps={{ 'aria-label': '스킬 설명 입력' }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button onClick={ onClose } sx={{ color: 'var(--color-text-secondary)' }}>
          취소
        </Button>
        <Button
          onClick={ handleAdd }
          variant='contained'
          disabled={ !newSkill.name.trim() }
          sx={{
            backgroundColor: 'var(--color-primary)',
            '&:hover': { backgroundColor: 'var(--color-primary-dark)' },
          }}
        >
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
});

function AboutMePage() {
  const { aboutMeData, updateSection, updatePhoto, addSkill } = usePortfolio();

  const [editContents, setEditContents] = useState(() =>
    aboutMeData.sections.reduce((acc, s) => ({ ...acc, [s.id]: s.content }), {})
  );
  const [savedSectionId, setSavedSectionId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePhotoUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => updatePhoto(ev.target.result);
    reader.readAsDataURL(file);
  }, [updatePhoto]);

  const handleSaveContent = useCallback((sectionId) => {
    updateSection(sectionId, editContents[sectionId]);
    setSavedSectionId(sectionId);
    setSnackbarOpen(true);
    setTimeout(() => setSavedSectionId(null), 2000);
  }, [updateSection, editContents]);

  const handleContentChange = useCallback((sectionId, value) => {
    setEditContents((prev) => ({ ...prev, [sectionId]: value }));
  }, []);

  const handleDialogClose = useCallback(() => setIsDialogOpen(false), []);
  const handleDialogOpen = useCallback(() => setIsDialogOpen(true), []);

  // 매 렌더마다 재계산 방지
  const groupedSkills = useMemo(() =>
    aboutMeData.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {}),
  [aboutMeData.skills]);

  const { basicInfo, sections } = aboutMeData;

  return (
    <Box
      component='main'
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
        backgroundColor: 'var(--color-bg-primary)',
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth='md'>

        {/* 페이지 헤더 */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant='overline'
            sx={{ color: 'var(--color-primary)', letterSpacing: 4, display: 'block', mb: 1 }}
          >
            ABOUT ME
          </Typography>
          <Typography
            variant='h1'
            sx={{ color: 'var(--color-text-primary)', fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700 }}
          >
            김명준을 소개합니다
          </Typography>
        </Box>

        {/* 기본 정보 카드 */}
        <Card
          sx={{
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            mb: 5,
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Grid container spacing={ 4 } alignItems='center'>
              {/* 프로필 이미지 */}
              <Grid
                size={{ xs: 12, md: 3 }}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}
              >
                <Avatar
                  src={ basicInfo.photo }
                  alt={ basicInfo.photo ? `${basicInfo.name} 프로필 사진` : '' }
                  sx={{
                    width: 120,
                    height: 120,
                    backgroundColor: 'var(--color-bg-tertiary)',
                    border: '2px solid var(--color-primary)',
                    fontSize: '2.5rem',
                    color: 'var(--color-primary)',
                  }}
                >
                  { !basicInfo.photo && basicInfo.name.charAt(0) }
                </Avatar>
                <Button
                  component='label'
                  variant='outlined'
                  size='small'
                  startIcon={ <PhotoCameraIcon /> }
                  aria-label='프로필 사진 업로드'
                  sx={{
                    color: 'var(--color-text-secondary)',
                    borderColor: 'var(--color-border)',
                    fontSize: '0.72rem',
                    '&:hover': { borderColor: 'var(--color-primary)', color: 'var(--color-primary)' },
                  }}
                >
                  사진 업로드
                  <input type='file' accept='image/*' hidden onChange={ handlePhotoUpload } />
                </Button>
              </Grid>

              {/* 기본 정보 */}
              <Grid size={{ xs: 12, md: 9 }}>
                <Typography
                  variant='h2'
                  sx={{ color: 'var(--color-text-primary)', fontWeight: 700, mb: 2.5, fontSize: { xs: '1.25rem', md: '1.6rem' } }}
                >
                  { basicInfo.name }
                </Typography>
                <Box
                  component='dl'
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, m: 0 }}
                >
                  { [
                    { label: '학력', value: basicInfo.education },
                    { label: '전공', value: basicInfo.major },
                    { label: '경력', value: basicInfo.experience },
                  ].map(({ label, value }) => (
                    <Box key={ label } sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography
                        component='dt'
                        sx={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', letterSpacing: 1, minWidth: 32 }}
                      >
                        { label }
                      </Typography>
                      <Typography
                        component='dd'
                        sx={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', m: 0 }}
                      >
                        { value }
                      </Typography>
                    </Box>
                  )) }
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* 콘텐츠 섹션 (아코디언) */}
        <Box sx={{ mb: 6 }}>
          <Typography
            component='h2'
            sx={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: 2, mb: 2 }}
          >
            STORY
          </Typography>

          {/* 홈 탭 반영 안내 */}
          <Box
            role='status'
            aria-live='polite'
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 2,
              px: 1.5,
              py: 1,
              backgroundColor: 'var(--color-primary)11',
              border: '1px solid var(--color-primary)22',
              borderRadius: 1,
            }}
          >
            <HomeIcon sx={{ fontSize: '0.9rem', color: 'var(--color-primary)' }} aria-hidden='true' />
            <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
              <Box component='span' sx={{ color: 'var(--color-primary)', fontWeight: 600 }}>홈</Box>{' '}
              배지가 있는 섹션은 저장 즉시 홈 탭에 반영됩니다.
            </Typography>
          </Box>

          { sections.map((section) => {
            const isSaved = savedSectionId === section.id;
            return (
              <Accordion
                key={ section.id }
                disableGutters
                sx={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px !important',
                  mb: 1.5,
                  overflow: 'hidden',
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': { borderColor: 'var(--color-primary)55' },
                  transition: 'border-color 0.3s ease',
                }}
              >
                <AccordionSummary
                  expandIcon={ <ExpandMoreIcon sx={{ color: 'var(--color-text-secondary)' }} /> }
                  aria-controls={ `${section.id}-content` }
                  id={ `${section.id}-header` }
                  sx={{ '&:hover': { backgroundColor: 'var(--color-bg-tertiary)' } }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Typography sx={{ color: 'var(--color-text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>
                      { section.title }
                    </Typography>
                    { section.showInHome && (
                      <Tooltip title='홈 탭에 표시됩니다' arrow enterDelay={ 400 }>
                        <Chip
                          icon={ <HomeIcon sx={{ fontSize: '12px !important' }} /> }
                          label='홈'
                          size='small'
                          aria-label='홈 탭에 표시되는 섹션'
                          sx={{
                            height: 20,
                            fontSize: '0.65rem',
                            backgroundColor: 'var(--color-primary)22',
                            color: 'var(--color-primary)',
                            border: '1px solid var(--color-primary)44',
                          }}
                        />
                      </Tooltip>
                    ) }
                  </Box>
                </AccordionSummary>
                <AccordionDetails id={ `${section.id}-content` } sx={{ pt: 0.5 }}>
                  <TextField
                    multiline
                    rows={ 4 }
                    fullWidth
                    value={ editContents[section.id] }
                    onChange={ (e) => handleContentChange(section.id, e.target.value) }
                    placeholder={ `${section.title}에 대한 내용을 입력해주세요.` }
                    aria-label={ `${section.title} 내용 입력` }
                    sx={{
                      mb: 1.5,
                      '& .MuiOutlinedInput-root': {
                        color: 'var(--color-text-secondary)',
                        fontSize: '0.9rem',
                        lineHeight: 1.8,
                        '& fieldset': { borderColor: 'var(--color-border)' },
                        '&:hover fieldset': { borderColor: 'var(--color-primary)77' },
                        '&.Mui-focused fieldset': { borderColor: 'var(--color-primary)' },
                      },
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1.5 }}>
                    { isSaved && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          color: '#4CAF50',
                          animation: 'fadeIn 0.2s ease',
                          '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } },
                        }}
                        role='status'
                        aria-live='polite'
                      >
                        <CheckIcon sx={{ fontSize: '0.9rem' }} />
                        <Typography sx={{ fontSize: '0.78rem', fontWeight: 600 }}>저장됨</Typography>
                      </Box>
                    ) }
                    <Button
                      variant='contained'
                      size='small'
                      onClick={ () => handleSaveContent(section.id) }
                      aria-label={ `${section.title} 저장` }
                      sx={{
                        backgroundColor: 'var(--color-primary)',
                        '&:hover': { backgroundColor: 'var(--color-primary-dark)' },
                        fontSize: '0.8rem',
                        px: 2.5,
                      }}
                    >
                      저장
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          }) }
        </Box>

        {/* 스킬 섹션 */}
        <Box component='section' aria-label='기술 스택'>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography
              component='h2'
              sx={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: 2 }}
            >
              SKILLS
            </Typography>
            <Button
              variant='outlined'
              size='small'
              startIcon={ <AddIcon /> }
              onClick={ handleDialogOpen }
              aria-label='새 스킬 추가'
              sx={{
                color: 'var(--color-primary)',
                borderColor: 'var(--color-primary)',
                fontSize: '0.8rem',
                '&:hover': { backgroundColor: 'var(--color-primary)11' },
              }}
            >
              스킬 추가
            </Button>
          </Box>

          { Object.entries(groupedSkills).map(([category, skills]) => (
            <Box key={ category } sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box
                  sx={{
                    width: 4,
                    height: 18,
                    borderRadius: 2,
                    backgroundColor: CATEGORY_COLORS[category] || '#AAAAAA',
                  }}
                  aria-hidden='true'
                />
                <Typography
                  component='h3'
                  sx={{
                    color: CATEGORY_COLORS[category] || '#AAAAAA',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    letterSpacing: 1.5,
                  }}
                >
                  { category }
                </Typography>
              </Box>
              <Grid container spacing={ 2 }>
                { skills.map((skill) => (
                  <Grid key={ skill.id } size={{ xs: 12, sm: 6, md: 4 }}>
                    <SkillCard skill={ skill } />
                  </Grid>
                )) }
              </Grid>
            </Box>
          )) }
        </Box>

      </Container>

      <AddSkillDialog
        isOpen={ isDialogOpen }
        onClose={ handleDialogClose }
        onAdd={ addSkill }
      />

      {/* 전역 저장 확인 토스트 */}
      <Snackbar
        open={ snackbarOpen }
        autoHideDuration={ 2500 }
        onClose={ () => setSnackbarOpen(false) }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity='success'
          variant='filled'
          onClose={ () => setSnackbarOpen(false) }
          icon={ <CheckIcon fontSize='inherit' /> }
          sx={{ backgroundColor: '#1e3a1e', color: '#a5d6a7', border: '1px solid #4CAF5044' }}
        >
          저장 완료 — 홈 탭에 즉시 반영됩니다.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AboutMePage;
