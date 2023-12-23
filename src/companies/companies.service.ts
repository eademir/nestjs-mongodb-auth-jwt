import { Injectable } from '@nestjs/common';
import { CompanyInterface } from '../interfaces/company.interface';
import { CommentInterface } from '../interfaces/comment.interface';
import { OrderItemInterface } from '../interfaces/orderItem.interface';
import { AddressInterface } from '../interfaces/address.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel('Company')
    private readonly companyModel: Model<CompanyInterface>,
  ) {}

  async create(
    name: string,
    description: string,
    address: AddressInterface,
    logo: string,
    menu: OrderItemInterface[],
    type: string,
    comments: CommentInterface[],
  ): Promise<CompanyInterface> {
    const newCompany = new this.companyModel({
      name,
      description,
      address,
      logo,
      menu,
      type,
      comments,
    });
    return await newCompany.save();
  }

  async menu(id: string): Promise<CompanyInterface> {
    return await this.companyModel.findById(id).exec();
  }
  async comments(id: string): Promise<CommentInterface[]> {
    const result: CompanyInterface = await this.companyModel
      .findById(id)
      .exec();
    return result.comments;
  }
  async updateMenu(
    id: string,
    menu: OrderItemInterface[],
  ): Promise<CompanyInterface> {
    return this.companyModel.findByIdAndUpdate(
      id,
      { menu: menu },
      { new: true },
    );
  }

  async createComment(
    id: string,
    comment: CommentInterface,
  ): Promise<CompanyInterface> {
    return this.companyModel.findByIdAndUpdate(
      id,
      { $push: { comments: comment } },
      { new: true },
    );
  }

  async findAll(): Promise<CompanyInterface[]> {
    const array: CompanyInterface[] = await this.companyModel.find().exec();
    for (let i = 0; i < array.length; i++) {
      let rating = 0;
      for (let j = 0; j < array[i].comments?.length; j++) {
        rating += array[i].comments[j].rating;
      }
      rating = rating / array[i].comments?.length;
      array[i].rating = rating;
    }
    array.sort((a, b) => {
      return b.rating - a.rating;
    });

    return array;
  }
}
