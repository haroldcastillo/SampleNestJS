import { IsString, IsEmail,IsEnum,IsNotEmpty,IsUrl, IsDate } from "class-validator";
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty({message:"password is required"})
  password: string;
  
  @IsEnum(["admin", "user"], { message: "role must be either admin or user" })
  role: "admin" | "user";

  @IsUrl()
  image: string;
}
