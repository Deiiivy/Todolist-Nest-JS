import { TodoModule } from './todo/todo.module';
import { TodoService } from './todo/todo.service';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TodoModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}