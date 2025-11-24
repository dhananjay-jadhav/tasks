import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateUserInput {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
