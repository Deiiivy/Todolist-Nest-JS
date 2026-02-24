import { Controller, Body, Get, Delete,Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.todoService.create(createTaskDto);
    }

    @Get(':userId')
    getAllTasks(@Param('userId') userId: string) {
        return this.todoService.findAll(userId);
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
