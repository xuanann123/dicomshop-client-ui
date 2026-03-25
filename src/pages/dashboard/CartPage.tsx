import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Divider,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCartStore } from '../../stores/cartStore';
import { formatPrice } from '../../utils/helpers';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart, totalPrice } =
    useCartStore();

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography sx={{ fontSize: '5rem', mb: 2 }}>🛒</Typography>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Giỏ hàng trống
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Hãy thêm vài chú chim bồ câu vào giỏ hàng nhé!
        </Typography>
        <Button
          variant="contained"
          startIcon={<ShoppingBagIcon />}
          onClick={() => navigate('/shop')}
        >
          Tiếp tục mua sắm
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Typography variant="h4" fontWeight={800}>
            Giỏ hàng
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ({items.length} sản phẩm)
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Cart Items */}
          <Grid size={{ xs: 12, md: 8 }}>
            {items.map((item) => (
              <Card
                key={item.product.id}
                sx={{
                  mb: 2,
                  borderRadius: 3,
                  '&:hover': { transform: 'none' },
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box
                      component="img"
                      src={item.product.image}
                      alt={item.product.name}
                      sx={{
                        width: { xs: 80, sm: 120 },
                        height: { xs: 80, sm: 100 },
                        objectFit: 'cover',
                        borderRadius: 2,
                        cursor: 'pointer',
                      }}
                      onClick={() => navigate(`/product/${item.product.id}`)}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        sx={{
                          cursor: 'pointer',
                          '&:hover': { color: 'primary.main' },
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        onClick={() => navigate(`/product/${item.product.id}`)}
                      >
                        {item.product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.product.breed} · {item.product.origin}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          mt: 1.5,
                          flexWrap: 'wrap',
                          gap: 1,
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <IconButton
                            size="small"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <TextField
                            value={item.quantity}
                            size="small"
                            sx={{ width: 60, '& input': { textAlign: 'center', py: 0.5 } }}
                            slotProps={{
                              htmlInput: { min: 1, max: item.product.stockQuantity },
                            }}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              if (!isNaN(val) && val > 0) {
                                updateQuantity(item.product.id, val);
                              }
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.product.stockQuantity}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="h6" color="primary" fontWeight={700}>
                            {formatPrice(item.product.price * item.quantity)}
                          </Typography>
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => removeItem(item.product.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}

            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/shop')}
              >
                Tiếp tục mua
              </Button>
              <Button color="error" onClick={clearCart}>
                Xóa tất cả
              </Button>
            </Box>
          </Grid>

          {/* Order Summary */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                borderRadius: 3,
                position: 'sticky',
                top: 80,
                '&:hover': { transform: 'none' },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Tóm tắt đơn hàng
                </Typography>
                <Divider sx={{ my: 1.5 }} />

                {items.map((item) => (
                  <Box
                    key={item.product.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      py: 0.5,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" sx={{ flex: 1, mr: 1 }} noWrap>
                      {item.product.name} x{item.quantity}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {formatPrice(item.product.price * item.quantity)}
                    </Typography>
                  </Box>
                ))}

                <Divider sx={{ my: 1.5 }} />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    py: 0.5,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Phí vận chuyển
                  </Typography>
                  <Typography variant="body2" color="success.main" fontWeight={600}>
                    {totalPrice() >= 5000000 ? 'Miễn phí' : formatPrice(200000)}
                  </Typography>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={700}>
                    Tổng cộng
                  </Typography>
                  <Typography variant="h5" color="primary" fontWeight={800}>
                    {formatPrice(
                      totalPrice() + (totalPrice() >= 5000000 ? 0 : 200000)
                    )}
                  </Typography>
                </Box>

                {totalPrice() < 5000000 && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, display: 'block' }}
                  >
                    Mua thêm {formatPrice(5000000 - totalPrice())} để được miễn
                    phí vận chuyển
                  </Typography>
                )}

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    mt: 3,
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
                  Thanh toán
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
