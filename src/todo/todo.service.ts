import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { title: string; description?: string }) {
    return this.prisma.task.create({ data })
  }

  async findAll() {
    return this.prisma.task.findMany()
  }

  async delete(id: string) {
    return this.prisma.task.delete({ where: { id } })
  }
}