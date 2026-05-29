import { useState } from 'react';
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
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
function SkillCard({ skill }) {
  const color = CATEGORY_COLORS[skill.category] || '#AAAAAA';
  const icon = SKILL_ICONS[skill.name] || <CodeIcon fontSize='small' />;

  return (
    <Tooltip title={skill.description || skill.name} arrow placement='top'>
      <Card
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
        }}
      >
        <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ color, display: 'flex', alignItems: 'center' }}>
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
              <AnimatedProgressBar value={ skill.level } color={ color } height={ 7 } />
            </Box>
            <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.78rem', minWidth: 34, textAlign: 'right' }}>
              { skill.level }%
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Tooltip>
  );
}

/**
 * AddSkillDialog
 *
 * Props:
 * @param {boolean} isOpen - 다이얼로그 열림 여부 [Required]
 * @param {function} onClose - 닫기 핸들러 [Required]
 * @param {function} onAdd - 스킬 추가 핸들러 [Required]
 */
function AddSkillDialog({ isOpen, onClose, onAdd }) {
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 50,
    category: 'Frontend',
    description: '',
  });

  const handleAdd = () => {
    if (!newSkill.name.trim()) return;
    onAdd(newSkill);
    setNewSkill({ name: '', level: 50, category: 'Frontend', description: '' });
    onClose();
  };

  return (
    <Dialog
      open={ isOpen }
      onClose={ onClose }
      maxWidth='sm'
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
        },
      }}
    >
      <DialogTitle sx={{ color: 'var(--color-text-primary)', fontWeight: 700 }}>
        스킬 추가
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: '16px !important' }}>
        <TextField
          label='기술명'
          value={ newSkill.name }
          onChange={ (e) => setNewSkill({ ...newSkill, name: e.target.value }) }
          fullWidth
          size='small'
          placeholder='예: TypeScript'
        />
        <FormControl fullWidth size='small'>
          <InputLabel>카테고리</InputLabel>
          <Select
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
          <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', mb: 1 }}>
            숙련도: <Box component='span' sx={{ color: 'var(--color-primary)', fontWeight: 700 }}>{ newSkill.level }%</Box>
          </Typography>
          <Slider
            value={ newSkill.level }
            onChange={ (_, val) => setNewSkill({ ...newSkill, level: val }) }
            min={ 0 }
            max={ 100 }
            step={ 5 }
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
}

function AboutMePage() {
  const { aboutMeData, setAboutMeData } = usePortfolio();

  const [editContents, setEditContents] = useState(
    aboutMeData.sections.reduce((acc, s) => ({ ...acc, [s.id]: s.content }), {})
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAboutMeData((prev) => ({
        ...prev,
        basicInfo: { ...prev.basicInfo, photo: ev.target.result },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveContent = (sectionId) => {
    setAboutMeData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId ? { ...s, content: editContents[sectionId] } : s
      ),
    }));
  };

  const handleAddSkill = (newSkill) => {
    setAboutMeData((prev) => ({
      ...prev,
      skills: [...prev.skills, { ...newSkill, id: Date.now(), showInMain: false }],
    }));
  };

  const groupedSkills = aboutMeData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const { basicInfo, sections } = aboutMeData;

  return (
    <Box
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
            variant='h4'
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
              <Grid size={{ xs: 12, md: 3 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                <Avatar
                  src={ basicInfo.photo }
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
                  variant='h5'
                  sx={{ color: 'var(--color-text-primary)', fontWeight: 700, mb: 2.5, fontSize: { xs: '1.25rem', md: '1.6rem' } }}
                >
                  { basicInfo.name }
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                  { [
                    { label: '학력', value: basicInfo.education },
                    { label: '전공', value: basicInfo.major },
                    { label: '경력', value: basicInfo.experience },
                  ].map(({ label, value }) => (
                    <Box key={ label } sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography
                        sx={{
                          color: 'var(--color-text-muted)',
                          fontSize: '0.75rem',
                          letterSpacing: 1,
                          minWidth: 32,
                        }}
                      >
                        { label }
                      </Typography>
                      <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
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
            sx={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: 2, mb: 2 }}
          >
            STORY
          </Typography>
          { sections.map((section) => (
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
              }}
            >
              <AccordionSummary
                expandIcon={ <ExpandMoreIcon sx={{ color: 'var(--color-text-secondary)' }} /> }
                sx={{ '&:hover': { backgroundColor: 'var(--color-bg-tertiary)' } }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography sx={{ color: 'var(--color-text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>
                    { section.title }
                  </Typography>
                  { section.showInHome && (
                    <Tooltip title='홈 탭에 표시됩니다' arrow>
                      <Chip
                        icon={ <HomeIcon sx={{ fontSize: '12px !important' }} /> }
                        label='홈'
                        size='small'
                        sx={{
                          height: 20,
                          fontSize: '0.65rem',
                          backgroundColor: 'var(--color-primary)22',
                          color: 'var(--color-primary)',
                          border: '1px solid var(--color-primary)44',
                          cursor: 'pointer',
                        }}
                      />
                    </Tooltip>
                  ) }
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0.5 }}>
                <TextField
                  multiline
                  rows={ 4 }
                  fullWidth
                  value={ editContents[section.id] }
                  onChange={ (e) => setEditContents((prev) => ({ ...prev, [section.id]: e.target.value })) }
                  placeholder={ `${section.title}에 대한 내용을 입력해주세요.` }
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
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant='contained'
                    size='small'
                    onClick={ () => handleSaveContent(section.id) }
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
          )) }
        </Box>

        {/* 스킬 섹션 */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography
              sx={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: 2 }}
            >
              SKILLS
            </Typography>
            <Button
              variant='outlined'
              size='small'
              startIcon={ <AddIcon /> }
              onClick={ () => setIsDialogOpen(true) }
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
                />
                <Typography
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
        onClose={ () => setIsDialogOpen(false) }
        onAdd={ handleAddSkill }
      />
    </Box>
  );
}

export default AboutMePage;
