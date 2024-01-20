import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from '../schemas/todo.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    console.log('Todo :  ', createTodoDto);

    const createdTodo = new this.todoModel(createTodoDto);
    return await createdTodo.save();
  }

  findAll() {
    return this.todoModel.find().exec();
  }

  findAllCompleted() {
    return this.todoModel.find({ completed: true }).exec();
  }

  findOne(id: string): Promise<Todo> {
    //return `This action returns a #${id} todo`;
    return this.todoModel.findById(id).exec();
  }

  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<UpdateTodoDto> {
    return await this.todoModel.findByIdAndUpdate(id, updateTodoDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Todo> {
    return await this.todoModel.findByIdAndDelete(id);
  }
}
