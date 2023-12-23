import { Get, Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserInterface } from '../interfaces/user.interface';
import { AddressInterface } from '../interfaces/address.interface';
import { OrderInterface } from '../interfaces/order.interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('age') age: number,
    @Body('gender') gender: number,
    @Body('address') address: AddressInterface[],
    @Body('orders') orders: OrderInterface[],
    @Body('image') image: string,
  ): Promise<{ id: string }> {
    const result = await this.usersService.create(
      name,
      email,
      password,
      age,
      gender,
      address,
      orders,
      image,
    );
    return { id: result.id };
  }
  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<UserInterface[]> {
    return this.usersService.findAll();
  }
}
