import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Products {
  @Prop({required: true, unique: true})
  name: string;
  @Prop({required: true})
  price: number;
  @Prop({required: true})
  description: string;
  @Prop({required: true})
  stock: number;
  @Prop({required: true})
  image: string;
  @Prop({required: true})
  category: string;
  @Prop({required: true})
  brand: string;
  @Prop({required: true})
  rating: number;
  @Prop({required: true})
  numReviews: number;
  @Prop({required: true})
  countInStock: number;
  @Prop({required: true})
  user: string;
  @Prop({required: true})
  createdAt: Date;
  @Prop({required: true})
  updatedAt: Date;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
