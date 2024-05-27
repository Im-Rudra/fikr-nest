import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async oAuthLogin(user: Partial<User>) {
    if (!user) {
      throw new Error('User not found!');
    }

    //    .... your business logic
    let userFromDb = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!userFromDb) {
      userFromDb = await this.prisma.user.create({
        data: user as User,
      });
    }

    //   .... add whatever payload you want to have
    const payload: Partial<User> = {
      id: userFromDb.id,
      email: userFromDb.email,
      name: userFromDb.name,
      avatar_url: userFromDb.avatar_url,
      is_admin: userFromDb.is_admin,
    };

    const jwt = await this.jwtService.signAsync(payload);

    return { jwt };
  }
}
