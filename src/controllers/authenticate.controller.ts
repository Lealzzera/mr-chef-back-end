import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

const authenticateBodySechema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type AuthenticateBodySechema = z.infer<typeof authenticateBodySechema>;

@Controller('/authenticate')
export class AuthenticateController {
  constructor(
    private readonly jwt: JwtService,
    private prismaService: PrismaService,
  ) {}
  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateBodySechema))
  async handle(@Body() body: AuthenticateBodySechema) {
    const { email, password } = body;

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User credentials do not match.');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials do not match.');
    }

    const accessToken = this.jwt.sign({ sub: user.id });

    return {
      accest_token: accessToken,
    };
  }
}
