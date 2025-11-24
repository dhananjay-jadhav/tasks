import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';
import { IsUserExist } from '../decorators/user-exist.decorator';

export class UpdateUserInput {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsUserExist()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
