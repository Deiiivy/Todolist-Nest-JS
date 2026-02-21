import { Controller, Body, Get, Delete,Param, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.todoService.create(createTaskDto);
    }

    @Get()
    getAllTasks() {
        return this.todoService.findAll();
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string) {
        return this.todoService.delete(id);
    }
}
