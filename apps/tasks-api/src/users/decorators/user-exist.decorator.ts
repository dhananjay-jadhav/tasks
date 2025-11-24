import { Injectable } from '@nestjs/common';
import { UsersService } from '@tasks/users';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UsersService) {}

  async validate(value: string): Promise<boolean> {
    console.log(value);
    const user = await this.userService.findByEmail(value);
    if (user?.id) {
      return false;
    }
    return true;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `User already exists with email: ${validationArguments?.value}`;
  }
}

export function IsUserExist(options?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      validator: IsUserExistConstraint,
      constraints: [],
      options,
    });
  };
}
