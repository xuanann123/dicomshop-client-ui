import { useState } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Link,
  CircularProgress,
  Chip,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useAuthStore } from '../../stores/authStore';
import { authService } from '../../services/authService';
import { DEMO_CREDENTIALS } from '../../mock/users';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await authService.login({ email, password });
      login(res.user, res.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: 'linear-gradient(135deg, #FFF8F0 0%, #FFE0B2 50%, #FFCC80 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(93,64,55,0.08) 0%, transparent 70%)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -150,
          left: -150,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,143,0,0.1) 0%, transparent 70%)',
        }}
      />

      {/* Left side - Branding */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          px: 6,
          position: 'relative',
        }}
      >
        <Box sx={{ textAlign: 'center', maxWidth: 480 }}>
          <Typography sx={{ fontSize: '5rem', mb: 2, lineHeight: 1 }}>
            🕊️
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #5D4037 0%, #8B6B61 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            PigeonShop
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: 'text.secondary', fontWeight: 400, mb: 4, lineHeight: 1.6 }}
          >
            Thiên đường của những người yêu chim bồ câu
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 3,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {[
              { number: '500+', label: 'Chim quý' },
              { number: '10K+', label: 'Khách hàng' },
              { number: '50+', label: 'Giống chim' },
              { number: '99%', label: 'Hài lòng' },
            ].map((stat) => (
              <Box key={stat.label} sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 800, color: 'secondary.dark' }}
                >
                  {stat.number}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Right side - Login form */}
      <Box
        sx={{
          flex: { xs: 1, md: '0 0 480px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, sm: 4 },
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 440,
            borderRadius: 4,
            boxShadow: '0 8px 40px rgba(93,64,55,0.15)',
            '&:hover': { transform: 'none' },
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            {/* Mobile logo */}
            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                mb: 3,
              }}
            >
              <Typography sx={{ fontSize: '2rem' }}>🕊️</Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #5D4037 0%, #FF8F00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                PigeonShop
              </Typography>
            </Box>

            <Typography variant="h5" fontWeight={700} gutterBottom>
              Chào mừng trở lại!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Đăng nhập để khám phá bộ sưu tập bồ câu tuyệt vời
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
            >
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                label="Mật khẩu"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link
                  href="#"
                  variant="body2"
                  underline="hover"
                  color="primary"
                  sx={{ fontWeight: 500 }}
                >
                  Quên mật khẩu?
                </Link>
              </Box>

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  background: 'linear-gradient(135deg, #5D4037 0%, #8B6B61 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4E342E 0%, #5D4037 100%)',
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Đăng nhập'
                )}
              </Button>
            </Box>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                hoặc
              </Typography>
            </Divider>

            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Chưa có tài khoản?{' '}
                <Link
                  component={RouterLink}
                  to="/register"
                  fontWeight={600}
                  underline="hover"
                >
                  Đăng ký ngay
                </Link>
              </Typography>
            </Box>

            {/* Demo credentials hint */}
            <Box
              sx={{
                mt: 2,
                p: 2,
                bgcolor: 'rgba(255,143,0,0.08)',
                borderRadius: 2,
                border: '1px dashed rgba(255,143,0,0.3)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                <InfoOutlinedIcon sx={{ fontSize: 18, color: 'secondary.dark' }} />
                <Typography variant="caption" fontWeight={600} color="secondary.dark">
                  Tài khoản demo
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Email: {DEMO_CREDENTIALS.email}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                Password: {DEMO_CREDENTIALS.password}
              </Typography>
              <Chip
                label="Điền nhanh"
                size="small"
                color="secondary"
                variant="outlined"
                onClick={fillDemo}
                sx={{ mt: 1, cursor: 'pointer' }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
