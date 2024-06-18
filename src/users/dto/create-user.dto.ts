import { IsString, IsEmail,IsEnum,IsNotEmpty,IsUrl } from "class-validator";
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(["admin", "user"], { message: "role must be either admin or user" })
  role: "admin" | "user";

  @IsUrl()
  image: string;
}
