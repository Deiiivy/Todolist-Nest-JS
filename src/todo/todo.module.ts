import { TodoController } from './todo.controller';
import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [TodoController],
    providers: [TodoService],
    imports: [AuthModule],
})
export class TodoModule {}
