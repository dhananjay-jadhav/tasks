import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { IsUserExist } from '../decorators/user-exist.decorator';

export class CreateUserInput {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsUserExist()
  email: string;

  @IsStrongPassword()
  password: string;
}
