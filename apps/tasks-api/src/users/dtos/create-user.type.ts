import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserInput {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
