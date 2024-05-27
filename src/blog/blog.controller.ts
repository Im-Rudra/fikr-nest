import { UserService } from '@/user/user.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Blog } from '@prisma/client';
import { BlogService } from './blog.service';

@Controller()
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('blog/:id')
  async getBlogById(@Param('id') id: string): Promise<Blog> {
    return this.blogService.blog({ id: Number(id) });
  }

  @Get('feed')
  async getPublishedBlogs(): Promise<Blog[]> {
    return this.blogService.blogs({
      where: { published: true },
    });
  }

  @Get('filtered-blogs/:searchString')
  async getFilteredBlogs(
    @Param('searchString') searchString: string,
  ): Promise<Blog[]> {
    return this.blogService.blogs({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          // {
          //   content: { contains: searchString },
          // },
        ],
      },
    });
  }

  // @Post('blog')
  // async createDraft(
  //   @Body() blogData: { title: string; content?: string; authorEmail: string },
  // ): Promise<Blog> {
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
  // async signupUser(
  //   @Body() userData: { name?: string; email: string },
  // ): Promise<UserModel> {
  //   return this.userService.createUser(userData);
  // }

  @Put('publish/:id')
  async publishBlog(@Param('id') id: string): Promise<Blog> {
    return this.blogService.updateBlog({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('blog/:id')
  async deleteBlog(@Param('id') id: string): Promise<Blog> {
    return this.blogService.deleteBlog({ id: Number(id) });
  }
}
