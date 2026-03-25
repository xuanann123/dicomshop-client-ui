import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Chip,
  Rating,
  Divider,
  Breadcrumbs,
  Link,
  Skeleton,
  Snackbar,
  Alert,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import type { Product } from '../../types/product';
import { productService } from '../../services/productService';
import { useCartStore } from '../../stores/cartStore';
import { formatPrice, getDiscountPercent } from '../../utils/helpers';
import { CATEGORY_LABELS, GENDER_LABELS } from '../../constant';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (!id) return;
    productService.getById(Number(id)).then((data) => {
      setProduct(data ?? null);
      setLoading(false);
    });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      setShowSnackbar(true);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton variant="rounded" height={400} sx={{ borderRadius: 3 }} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton width="60%" height={40} />
            <Skeleton width="40%" height={30} sx={{ mt: 1 }} />
            <Skeleton width="80%" height={24} sx={{ mt: 2 }} />
            <Skeleton width="100%" height={120} sx={{ mt: 2 }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography sx={{ fontSize: '4rem', mb: 2 }}>🕊️</Typography>
        <Typography variant="h5" gutterBottom>
          Không tìm thấy sản phẩm
        </Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/shop')}>
          Quay lại cửa hàng
        </Button>
      </Container>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  const specs = [
    { label: 'Giống', value: product.breed },
    { label: 'Tuổi', value: product.age },
    { label: 'Giới tính', value: GENDER_LABELS[product.gender] },
    { label: 'Màu sắc', value: product.color },
    { label: 'Cân nặng', value: product.weight },
    { label: 'Xuất xứ', value: product.origin },
    { label: 'Tình trạng', value: product.inStock ? `Còn ${product.stockQuantity} con` : 'Hết hàng' },
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link
            underline="hover"
            color="inherit"
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Trang chủ
          </Link>
          <Link
            underline="hover"
            color="inherit"
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/shop')}
          >
            Cửa hàng
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          {/* Images */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                mb: 2,
                position: 'relative',
              }}
            >
              <Box
                component="img"
                src={product.images[selectedImage]}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: { xs: 300, md: 450 },
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {hasDiscount && (
                <Chip
                  label={`-${getDiscountPercent(product.originalPrice!, product.price)}%`}
                  color="error"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    fontWeight: 700,
                    fontSize: '0.9rem',
                  }}
                />
              )}
            </Box>
            {product.images.length > 1 && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {product.images.map((img, i) => (
                  <Box
                    key={i}
                    component="img"
                    src={img}
                    alt=""
                    onClick={() => setSelectedImage(i)}
                    sx={{
                      width: 80,
                      height: 60,
                      objectFit: 'cover',
                      borderRadius: 1.5,
                      cursor: 'pointer',
                      border: selectedImage === i ? '3px solid' : '2px solid transparent',
                      borderColor: selectedImage === i ? 'primary.main' : 'transparent',
                      opacity: selectedImage === i ? 1 : 0.6,
                      transition: 'all 0.2s',
                      '&:hover': { opacity: 1 },
                    }}
                  />
                ))}
              </Box>
            )}
          </Grid>

          {/* Info */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Chip
                label={CATEGORY_LABELS[product.category]}
                color="primary"
                size="small"
              />
              {product.gender === 'male' ? (
                <Chip icon={<MaleIcon />} label="Trống" size="small" color="info" variant="outlined" />
              ) : (
                <Chip icon={<FemaleIcon />} label="Mái" size="small" color="secondary" variant="outlined" />
              )}
              {product.featured && (
                <Chip label="Hot" size="small" sx={{ bgcolor: 'secondary.main', color: 'white', fontWeight: 700 }} />
              )}
            </Box>

            <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary">
                {product.rating} ({product.reviewCount} đánh giá)
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 3 }}>
              <Typography variant="h4" color="primary" fontWeight={800}>
                {formatPrice(product.price)}
              </Typography>
              {hasDiscount && (
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through' }}
                >
                  {formatPrice(product.originalPrice!)}
                </Typography>
              )}
            </Box>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.8, mb: 3 }}
            >
              {product.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Specs */}
            <Box sx={{ mb: 3 }}>
              {specs.map((spec) => (
                <Box
                  key={spec.label}
                  sx={{
                    display: 'flex',
                    py: 1,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ minWidth: 120 }}
                  >
                    {spec.label}
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {spec.value}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Tags */}
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 3 }}>
              {product.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              ))}
            </Box>

            {/* Actions */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                disabled={!product.inStock}
                onClick={handleAddToCart}
                sx={{
                  flex: 1,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #FF8F00 0%, #FFC046 100%)',
                  color: '#3E2723',
                  fontWeight: 700,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #E65100 0%, #FF8F00 100%)',
                    color: 'white',
                  },
                }}
              >
                {product.inStock ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/shop')}
              >
                Tiếp tục mua
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity="success"
          onClose={() => setShowSnackbar(false)}
          sx={{ borderRadius: 2 }}
        >
          Đã thêm vào giỏ hàng!
        </Alert>
      </Snackbar>
    </Box>
  );
}
