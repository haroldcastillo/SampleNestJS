import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import { Url } from "url";

@Schema()
export class User {
  @Prop({required: true, unique: true})
  name: string;
  @Prop({required: true})
  email: string;
  @Prop({required: true})
  role: "admin" | "user";
  @Prop({required: false})
  image: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
