# Type Organization Guide

## Overview

All shared types are centralized in `src/api-lib/api-type.ts` to ensure consistency across the project.

## Type Categories

### 1. Core Entity Types

- `ProductType` - Main product interface
- `NewsType` - News/article interface
- `ReviewType` - Customer review interface
- `UserType` - User/customer interface
- `OrderType` - Order interface

### 2. Extended Types

- `CartItem` - Extends ProductType with quantity
- `OrderItem` - Simplified product for orders

### 3. API Response Types

- `ApiResponse<T>` - Standard API response wrapper
- `PaginatedResponse<T>` - For paginated data

### 4. Component Prop Types

Define component-specific prop interfaces in the component files:

```typescript
interface ProductProps {
  product: ProductType;
}
```

## Best Practices

### ✅ Do:

- Import types from `@/api-lib/api-type`
- Extend base types when needed (e.g., CartItem extends ProductType)
- Use consistent naming conventions
- Define component prop interfaces locally
- Use generic types for reusable patterns

### ❌ Don't:

- Duplicate type definitions across files
- Define entity types in component files
- Import types from page files
- Create inconsistent field names

## Usage Examples

### Importing Types

```typescript
import { ProductType, CartItem, ApiResponse } from '@/api-lib/api-type';
```

### Component Props

```typescript
interface ProductCardProps {
  product: ProductType;
  onAddToCart?: (product: ProductType) => void;
}
```

### API Functions

```typescript
const fetchProducts = (): Promise<ApiResponse<ProductType[]>> => {
  // implementation
};
```

### Store Types

```typescript
interface CartStore {
  items: CartItem[];
  addToCart: (item: ProductType) => void;
}
```

## Migration Checklist

- [x] Centralized all entity types in api-type.ts
- [x] Fixed Product component prop interface
- [x] Updated cart store to use centralized types
- [x] Fixed import paths in sample files
- [ ] Review dashboard page types (if any)
- [ ] Update any remaining duplicate type definitions
