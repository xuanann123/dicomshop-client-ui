import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import type { Product } from '../../types/product';
import { useCartStore } from '../../stores/cartStore';
import { formatPrice, getDiscountPercent } from '../../utils/helpers';
import { CATEGORY_LABELS } from '../../constant';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
      }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Badges */}
      <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
        {hasDiscount && (
          <Chip
            label={`-${getDiscountPercent(product.originalPrice!, product.price)}%`}
            size="small"
            color="error"
            sx={{ fontWeight: 700, fontSize: '0.75rem' }}
          />
        )}
        {!product.inStock && (
          <Chip label="Hết hàng" size="small" color="default" />
        )}
        {product.featured && (
          <Chip
            label="Hot"
            size="small"
            sx={{
              bgcolor: 'secondary.main',
              color: 'white',
              fontWeight: 700,
            }}
          />
        )}
      </Box>

      <CardMedia
        component="img"
        height={220}
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
          <Chip
            label={CATEGORY_LABELS[product.category]}
            size="small"
            variant="outlined"
            color="primary"
            sx={{ fontSize: '0.7rem', height: 22 }}
          />
          {product.gender === 'male' ? (
            <MaleIcon sx={{ fontSize: 18, color: '#1976d2' }} />
          ) : (
            <FemaleIcon sx={{ fontSize: 18, color: '#e91e63' }} />
          )}
        </Box>

        <Typography
          variant="subtitle1"
          fontWeight={700}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.4,
            minHeight: '2.8em',
            mt: 0.5,
          }}
        >
          {product.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1, fontSize: '0.8rem' }}
        >
          {product.breed} · {product.origin}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <Rating value={product.rating} precision={0.1} size="small" readOnly />
          <Typography variant="caption" color="text.secondary">
            ({product.reviewCount})
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography variant="h6" color="primary" fontWeight={800}>
            {formatPrice(product.price)}
          </Typography>
          {hasDiscount && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'line-through' }}
            >
              {formatPrice(product.originalPrice!)}
            </Typography>
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          variant="contained"
          size="small"
          fullWidth
          startIcon={<ShoppingCartIcon />}
          disabled={!product.inStock}
          onClick={(e) => {
            e.stopPropagation();
            addItem(product);
          }}
          sx={{
            background: product.inStock
              ? 'linear-gradient(135deg, #FF8F00 0%, #FFC046 100%)'
              : undefined,
            color: product.inStock ? '#3E2723' : undefined,
            '&:hover': product.inStock
              ? { background: 'linear-gradient(135deg, #E65100 0%, #FF8F00 100%)', color: 'white' }
              : undefined,
          }}
        >
          {product.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
        </Button>
      </CardActions>
    </Card>
  );
}
