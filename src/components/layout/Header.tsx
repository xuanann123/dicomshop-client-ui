import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Container,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthStore } from '../../stores/authStore';
import { useCartStore } from '../../stores/cartStore';

const NAV_ITEMS = [
  { label: 'Trang Chủ', path: '/', icon: <HomeIcon /> },
  { label: 'Cửa Hàng', path: '/shop', icon: <StoreIcon /> },
];

export default function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { user, logout } = useAuthStore();
  const totalItems = useCartStore((s) => s.totalItems);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    navigate('/login');
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          color: 'text.primary',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 1 }}>
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} edge="start">
                <MenuIcon />
              </IconButton>
            )}

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                gap: 1,
              }}
              onClick={() => navigate('/')}
            >
              <Typography variant="h5" sx={{ fontSize: '1.6rem' }}>
                🕊️
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #5D4037 0%, #FF8F00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.5px',
                }}
              >
                PigeonShop
              </Typography>
            </Box>

            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1, ml: 4 }}>
                {NAV_ITEMS.map((item) => (
                  <Button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    sx={{
                      color:
                        location.pathname === item.path
                          ? 'primary.main'
                          : 'text.secondary',
                      fontWeight: location.pathname === item.path ? 700 : 500,
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            <Box sx={{ flexGrow: 1 }} />

            <IconButton onClick={() => navigate('/cart')} sx={{ mr: 1 }}>
              <Badge badgeContent={totalItems()} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {user ? (
              <>
                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: 'primary.main',
                      fontSize: '0.9rem',
                    }}
                  >
                    {user.firstName?.charAt(0)}
                    {user.lastName?.charAt(0)}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={!!anchorEl}
                  onClose={() => setAnchorEl(null)}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem disabled>
                    <PersonIcon sx={{ mr: 1, fontSize: 20 }} />
                    {user.firstName} {user.lastName}
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
                    Đăng xuất
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate('/login')}
              >
                Đăng nhập
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 260, pt: 2 }}>
          <Box sx={{ px: 2, pb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5">🕊️</Typography>
            <Typography variant="h6" fontWeight={800} color="primary">
              PigeonShop
            </Typography>
          </Box>
          <Divider />
          <List>
            {NAV_ITEMS.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => {
                    navigate(item.path);
                    setDrawerOpen(false);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
