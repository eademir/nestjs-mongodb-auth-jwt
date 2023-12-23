import { Get, Controller, Post, Body, Param, Put, Query, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompanyInterface } from '../interfaces/company.interface';
import { AddressInterface } from '../interfaces/address.interface';
import { OrderItemInterface } from '../interfaces/orderItem.interface';
import { CommentInterface } from '../interfaces/comment.interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('address') address: AddressInterface,
    @Body('logo') logo: string,
    @Body('menu') menu: OrderItemInterface[],
    @Body('type') type: string,
    @Body('comments') comments: CommentInterface[],
  ): Promise<{ id: string }> {
    const result = await this.companiesService.create(
      name,
      description,
      address,
      logo,
      menu,
      type,
      comments,
    );
    return { id: result.id };
  }
  @UseGuards(AuthGuard)
  @Get(':id/menu')
  async menu(@Param('id') id: string): Promise<OrderItemInterface[]> {
    const result: CompanyInterface = await this.companiesService.menu(id);
    return result.menu;
  }
  @UseGuards(AuthGuard)
  @Put(':id/menu')
  async updateMenu(
    @Param('id') id: string,
    @Body('menu') menu: OrderItemInterface[],
  ): Promise<{ id: string }> {
    const result = await this.companiesService.updateMenu(id, menu);
    return { id: result.id };
  }
  @UseGuards(AuthGuard)
  @Get('closestFive')
  async findClosestFive(): Promise<CompanyInterface[]> {
    const LAT = 39.93;
    const LNG = 32.85;
    const array: CompanyInterface[] = await this.companiesService.findAll();
    for (let i = 0; i < array.length; i++) {
      const distance = Math.sqrt(
        Math.pow(array[i].address.location.lat - LAT, 2) +
          Math.pow(array[i].address.location.lng - LNG, 2),
      );
      array[i].address.distance = distance;
    }
    array.sort((a, b) => {
      return a.address.distance - b.address.distance;
    });
    return array.slice(0, 5);
  }
  @UseGuards(AuthGuard)
  @Get(':id/comments/:gender')
  async comments(
    @Param('id') id: string,
    @Param('gender') gender: number,
  ): Promise<CommentInterface[]> {
    const commments: CommentInterface[] = await this.companiesService.comments(
      id,
    );
    const result: CommentInterface[] = [];
    for (let i = 0; i < commments?.length; i++) {
      if (this.comments[i].user.gender === gender) {
        result.push(this.comments[i]);
      }
    }
    return result;
  }
  @UseGuards(AuthGuard)
  @Post(':id/comments')
  async createComment(
    @Param('id') id: string,
    @Body('comment') comment: CommentInterface,
  ): Promise<{ id: string }> {
    const result = await this.companiesService.createComment(id, comment);
    return { id: result.id };
  }

  @UseGuards(AuthGuard)
  @Post('filter')
  async filter(
    @Body('types') types: string[],
    @Body('rating') rating: number,
    @Body('description') description: string,
  ): Promise<{ name: string; description: string; rating: number }[]> {
    const array: CompanyInterface[] = await this.companiesService.findAll();
    const result: { name: string; description: string; rating: number }[] = [];
    for (let i = 0; i < array.length; i++) {
      if (
        types?.includes(array[i].type) ||
        array[i].rating >= rating ||
        array[i].description.includes(description)
      ) {
        result.push({
          name: array[i].name,
          description: array[i].description,
          rating: array[i].rating,
        });
      }
    }
    return result;
  }
  @UseGuards(AuthGuard)
  @Get('pagination')
  async pagination(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<CompanyInterface[]> {
    const array: CompanyInterface[] = await this.companiesService.findAll();
    return array.slice(page * limit, (page + 1) * limit);
    // this is not a real solution
  }
  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<CompanyInterface[]> {
    return await this.companiesService.findAll();
  }
}
