import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user-decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@UseGuards(JwtAuthGuard)
@Controller('/store')
export class FetchStoreController {
  constructor(private prismaService: PrismaService) {}

  @Get()
  @HttpCode(200)
  async handle(@CurrentUser() user) {
    const store = await this.prismaService.store.findMany({
      where: {
        userId: user.sub,
      },
      include: {
        menu: true,
      },
    });
    return store;
  }
}
