import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Skeleton,
  Chip,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import type { Product } from '../../types/product';
import { productService } from '../../services/productService';
import { CATEGORY_LABELS } from '../../constant';
import ProductCard from '../../components/ui/ProductCard';

export default function HomePage() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getFeatured().then((data) => {
      setFeatured(data);
      setLoading(false);
    });
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #5D4037 0%, #8B6B61 40%, #BCAAA4 100%)',
          color: 'white',
          py: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            right: { xs: '-20%', md: '5%' },
            transform: 'translateY(-50%)',
            fontSize: { xs: '8rem', md: '14rem' },
            opacity: 0.1,
            userSelect: 'none',
          }}
        >
          🕊️
        </Box>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 600, position: 'relative', zIndex: 1 }}>
            <Chip
              label="Miễn phí vận chuyển cho đơn trên 5 triệu"
              color="secondary"
              size="small"
              sx={{ mb: 2, fontWeight: 600 }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '3rem' },
                lineHeight: 1.2,
                mb: 2,
              }}
            >
              Bồ Câu Quý Từ
              <br />
              Khắp Nơi Trên Thế Giới
            </Typography>
            <Typography
              variant="h6"
              sx={{ opacity: 0.85, fontWeight: 400, mb: 4, lineHeight: 1.6 }}
            >
              Khám phá bộ sưu tập hơn 500+ giống bồ câu từ đua, kiểng, nhào
              lộn đến đưa thư. Chất lượng đảm bảo, giao hàng toàn quốc.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/shop')}
                sx={{
                  bgcolor: 'secondary.main',
                  color: '#3E2723',
                  fontWeight: 700,
                  px: 4,
                  '&:hover': { bgcolor: 'secondary.dark', color: 'white' },
                }}
              >
                Mua ngay
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/shop')}
                sx={{
                  borderColor: 'rgba(255,255,255,0.5)',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Xem bộ sưu tập
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Trust Badges */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {[
            {
              icon: <LocalShippingIcon />,
              title: 'Giao hàng toàn quốc',
              desc: 'An toàn, nhanh chóng',
            },
            {
              icon: <VerifiedIcon />,
              title: 'Đảm bảo chất lượng',
              desc: 'Bảo hành 30 ngày',
            },
            {
              icon: <SupportAgentIcon />,
              title: 'Tư vấn 24/7',
              desc: 'Hỗ trợ nhiệt tình',
            },
            {
              icon: <AutorenewIcon />,
              title: 'Đổi trả dễ dàng',
              desc: 'Hoàn tiền 100%',
            },
          ].map((item) => (
            <Grid size={{ xs: 6, md: 3 }} key={item.title}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
              >
                <Box sx={{ color: 'primary.main' }}>{item.icon}</Box>
                <Box>
                  <Typography variant="body2" fontWeight={700}>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categories */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Danh mục chim
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 2 }}>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <Chip
              key={key}
              label={label}
              onClick={() => navigate(`/shop?category=${key}`)}
              sx={{
                px: 1,
                py: 2.5,
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                '&:hover': { bgcolor: 'primary.light', color: 'white' },
              }}
              variant="outlined"
              color="primary"
            />
          ))}
        </Box>
      </Container>

      {/* Featured Products */}
      <Box sx={{ bgcolor: 'rgba(93,64,55,0.03)', py: 6 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography variant="h4" fontWeight={800}>
              Chim nổi bật
            </Typography>
            <Button
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/shop')}
            >
              Xem tất cả
            </Button>
          </Box>

          <Grid container spacing={3}>
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                    <Skeleton
                      variant="rounded"
                      height={380}
                      sx={{ borderRadius: 4 }}
                    />
                  </Grid>
                ))
              : featured.map((product) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #FF8F00 0%, #FFC046 100%)',
          py: 6,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{ color: '#3E2723', mb: 2 }}
          >
            Bạn cần tư vấn chọn chim?
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'rgba(62,39,35,0.8)', mb: 3, maxWidth: 500, mx: 'auto' }}
          >
            Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn tìm giống
            chim bồ câu phù hợp nhất
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: '#3E2723',
              color: 'white',
              px: 5,
              '&:hover': { bgcolor: '#5D4037' },
            }}
          >
            Liên hệ ngay: 0901 234 567
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
