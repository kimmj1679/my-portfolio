import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About Me', path: '/about' },
  { label: 'Projects', path: '/projects' },
];

function NavBar() {
  const location = useLocation();

  return (
    <AppBar position='sticky'>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
        <Typography
          variant='h6'
          sx={{
            color: 'var(--color-primary)',
            fontWeight: 700,
            letterSpacing: 1,
            textDecoration: 'none',
          }}
          component={Link}
          to='/'
        >
          PORTFOLIO
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          { NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={ item.path }
                component={ Link }
                to={ item.path }
                sx={{
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
                  borderRadius: 0,
                  px: 2,
                  '&:hover': {
                    color: 'var(--color-text-primary)',
                    backgroundColor: 'var(--color-bg-tertiary)',
                  },
                }}
              >
                { item.label }
              </Button>
            );
          }) }
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
