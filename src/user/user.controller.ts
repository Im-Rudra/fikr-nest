import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get('blog/:id')
  // async getBlogById(@Param('id') id: string): Promise<BlogModel> {
  //   return this.blogService.blog({ id: Number(id) });
  // }

  // @Get('feed')
  // async getPublishedBlogs(): Promise<BlogModel[]> {
  //   return this.blogService.blogs({
  //     where: { published: true },
  //   });
  // }

  // @Get('filtered-blogs/:searchString')
  // async getFilteredBlogs(
  //   @Param('searchString') searchString: string,
  // ): Promise<BlogModel[]> {
  //   return this.blogService.blogs({
  //     where: {
  //       OR: [
  //         {
  //           title: { contains: searchString },
  //         },
  //         // {
  //         //   content: { contains: searchString },
  //         // },
  //       ],
  //     },
  //   });
  // }

  // @Post('blog')
  // async createDraft(
  //   @Body() blogData: { title: string; content?: string; authorEmail: string },
  // ): Promise<BlogModel> {
  //   const { title, content, authorEmail } = blogData;
  //   return this.blogService.createBlog({
  //     title,
  //     content,
  //     author: {
  //       connect: { email: authorEmail },
  //     },
  //   });
  // }

  // @Post('user')
  // async signupUser(@Body() body: CreateUserDto): Promise<User> {
  //   return this.userService.createUser(body);
  // }

  // @Put('publish/:id')
  // async publishBlog(@Param('id') id: string): Promise<BlogModel> {
  //   return this.blogService.updateBlog({
  //     where: { id: Number(id) },
  //     data: { published: true },
  //   });
  // }

  // @Delete('blog/:id')
  // async deleteBlog(@Param('id') id: string): Promise<BlogModel> {
  //   return this.blogService.deleteBlog({ id: Number(id) });
  // }
}
