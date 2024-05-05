import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const user = await prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        cpf: createUserDto.cpf,
      },
    });
    return `usuário criado com sucesso ${user}`;
  }

  findAll() {
    return prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    return user ? user : 'Usuário não encontrado!';
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
    return { message: 'Usuário atualizado com sucesso!', user };
  }

  async delete(id: number) {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    return 'Usuário deletado com sucesso';
  }
}
