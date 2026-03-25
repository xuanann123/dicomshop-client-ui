import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
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
  Link,
  CircularProgress,
  Grid,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuthStore } from '../../stores/authStore';
import { authService } from '../../services/authService';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const updateField = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    if (form.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);
    try {
      const res = await authService.register({
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
      });
      login(res.user, res.token);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FFF8F0 0%, #FFE0B2 50%, #FFCC80 100%)',
        p: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -120,
          left: -120,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(93,64,55,0.06) 0%, transparent 70%)',
        }}
      />

      <Card
        sx={{
          width: '100%',
          maxWidth: 520,
          borderRadius: 4,
          boxShadow: '0 8px 40px rgba(93,64,55,0.15)',
          '&:hover': { transform: 'none' },
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/login')}
            sx={{ mb: 2, ml: -1 }}
            size="small"
          >
            Quay lại đăng nhập
          </Button>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 1,
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
              Tạo tài khoản
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Tham gia cộng đồng người yêu chim bồ câu lớn nhất Việt Nam
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Họ"
                  value={form.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  required
                  fullWidth
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="action" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Tên"
                  value={form.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
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
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Số điện thoại"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  fullWidth
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon color="action" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Mật khẩu"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => updateField('password', e.target.value)}
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
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Xác nhận mật khẩu"
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => updateField('confirmPassword', e.target.value)}
                  required
                  fullWidth
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="action" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              sx={{
                mt: 3,
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
                'Tạo tài khoản'
              )}
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              sx={{ mt: 2 }}
            >
              Đã có tài khoản?{' '}
              <Link
                component={RouterLink}
                to="/login"
                fontWeight={600}
                underline="hover"
              >
                Đăng nhập
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
