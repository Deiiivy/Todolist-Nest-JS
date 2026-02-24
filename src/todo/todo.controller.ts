import { Controller, Body, Get, Delete,Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.todoService.create(createTaskDto);
    }

    @Get()
    getAllTasks(@Request() req) {
        return this.todoService.findAll(req.user.sub);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string) {
        return this.todoService.delete(id);
    }

    @Put(':id')
    updateTask(@Param('id') id: string, @Body() updateTaskDto: CreateTaskDto) {
        return this.todoService.update(id, updateTaskDto);
    }
}
