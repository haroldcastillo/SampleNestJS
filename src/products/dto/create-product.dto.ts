export class CreateProductDto {
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  category: string;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}
