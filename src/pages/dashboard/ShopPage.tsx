import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Chip,
  Skeleton,
  InputAdornment,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { Product, ProductCategory, ProductFilter } from '../../types/product';
import { productService } from '../../services/productService';
import { CATEGORY_LABELS, SORT_OPTIONS } from '../../constant';
import ProductCard from '../../components/ui/ProductCard';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<ProductCategory | ''>(() =>
    (searchParams.get('category') as ProductCategory) || ''
  );
  const [sortBy, setSortBy] = useState<ProductFilter['sortBy']>('newest');

  useEffect(() => {
    setLoading(true);
    const filter: ProductFilter = {
      search: search || undefined,
      category: category || undefined,
      sortBy,
    };
    productService.getAll(filter).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [search, category, sortBy]);

  const handleCategoryChange = (cat: ProductCategory | '') => {
    setCategory(cat);
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Cửa hàng chim bồ câu
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Tìm kiếm và lựa chọn giống chim bồ câu phù hợp với bạn
        </Typography>

        {/* Filters */}
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            mb: 4,
            borderRadius: 3,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 5 }}>
              <TextField
                placeholder="Tìm kiếm chim bồ câu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                <Chip
                  label="Tất cả"
                  variant={category === '' ? 'filled' : 'outlined'}
                  color={category === '' ? 'primary' : 'default'}
                  onClick={() => handleCategoryChange('')}
                  size="small"
                />
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <Chip
                    key={key}
                    label={label}
                    variant={category === key ? 'filled' : 'outlined'}
                    color={category === key ? 'primary' : 'default'}
                    onClick={() => handleCategoryChange(key as ProductCategory)}
                    size="small"
                  />
                ))}
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as ProductFilter['sortBy'])}
                fullWidth
                size="small"
                label="Sắp xếp"
              >
                {SORT_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Paper>

        {/* Results count */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {loading ? '...' : `${products.length} sản phẩm`}
        </Typography>

        {/* Products Grid */}
        <Grid container spacing={3}>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                  <Skeleton
                    variant="rounded"
                    height={380}
                    sx={{ borderRadius: 4 }}
                  />
                </Grid>
              ))
            : products.map((product) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
        </Grid>

        {!loading && products.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography sx={{ fontSize: '4rem', mb: 2 }}>🔍</Typography>
            <Typography variant="h6" color="text.secondary">
              Không tìm thấy chim bồ câu nào phù hợp
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
