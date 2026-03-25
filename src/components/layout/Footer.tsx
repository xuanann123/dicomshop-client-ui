import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#3E2723',
        color: 'rgba(255,255,255,0.85)',
        mt: 'auto',
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography variant="h5">🕊️</Typography>
              <Typography variant="h6" fontWeight={800} color="white">
                PigeonShop
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.8 }}>
              Chuyên cung cấp các giống bồ câu chất lượng cao từ khắp nơi trên
              thế giới. Uy tín - Chất lượng - Tận tâm phục vụ từ năm 2020.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom color="white">
              Liên hệ
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2">0901 234 567</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2">info@pigeonshop.vn</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2">
                  123 Nguyễn Huệ, Q.1, TP.HCM
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom color="white">
              Chính sách
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {[
                'Chính sách bảo hành',
                'Chính sách vận chuyển',
                'Hướng dẫn chăm sóc',
                'Câu hỏi thường gặp',
              ].map((text) => (
                <Link
                  key={text}
                  href="#"
                  underline="hover"
                  color="inherit"
                  variant="body2"
                  sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.15)' }} />

        <Typography variant="body2" textAlign="center" sx={{ opacity: 0.6 }}>
          © 2026 PigeonShop. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
