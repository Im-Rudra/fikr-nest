import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Blog, Prisma } from '@prisma/client';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async blog(
    blogWhereUniqueInput: Prisma.BlogWhereUniqueInput,
  ): Promise<Blog | null> {
    return this.prisma.blog.findUnique({
      where: blogWhereUniqueInput,
    });
  }

  async blogs(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BlogWhereUniqueInput;
    where?: Prisma.BlogWhereInput;
    orderBy?: Prisma.BlogOrderByWithRelationInput;
  }): Promise<Blog[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.blog.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createBlog(data: Prisma.BlogCreateInput): Promise<Blog> {
    return this.prisma.blog.create({
      data,
    });
  }

  async updateBlog(params: {
    where: Prisma.BlogWhereUniqueInput;
    data: Prisma.BlogUpdateInput;
  }): Promise<Blog> {
    const { data, where } = params;
    return this.prisma.blog.update({
      data,
      where,
    });
  }

  async deleteBlog(where: Prisma.BlogWhereUniqueInput): Promise<Blog> {
    return this.prisma.blog.delete({
      where,
    });
  }
}
