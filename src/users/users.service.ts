import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from '../interfaces/user.interface';
import { Model } from 'mongoose';
import { AddressInterface } from '../interfaces/address.interface';
import { OrderInterface } from '../interfaces/order.interface';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {}

  async create(
    name: string,
    email: string,
    password: string,
    age: number,
    gender: number,
    address: AddressInterface[],
    orders: OrderInterface[],
    image: string,
  ): Promise<UserInterface> {
    const newUser = new this.userModel({
      name,
      email,
      password, // bcrypt is not necessary at this point
      age,
      gender,
      address,
      orders,
      image,
    });
    return await newUser.save();
  }

  async findOne(email: string): Promise<UserInterface | undefined> {
    return await this.userModel.findOne({ email: email }).exec();
  }
  async findAll(): Promise<UserInterface[]> {
    return await this.userModel.find().exec();
  }
}
