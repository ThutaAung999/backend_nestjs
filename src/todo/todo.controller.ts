import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Headers,
  HttpException,
  HttpStatus,
  Ip,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Redirect,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { QueryTodoDto } from './dto/query-todo.dto';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { DtoValidationWithClassValidatorPipe } from '../pipes/dto-validation_with_class-validator/dto-validation_with_class-validator.pipe';
import { AuthGuard } from '../auth/auth.guard';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { TodoDecorator } from './todo.decorator';
import { Todo } from '../schemas/todo.schema';

@Controller('api/todo')
//@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('/completed')
  async findAllCompleted() {
    return await this.todoService.findAllCompleted();
  }

  @UseFilters(new HttpExceptionFilter())
  @Get('/problem')
  problem() {
    //throw new Error('error :');
    const errorResponse = {
      statusCode: HttpStatus.FORBIDDEN,
      errorDetails: 'Something went wrong',
      message: {
        description: 'Customer error message',
      },
    };
    throw new HttpException(errorResponse, HttpStatus.FORBIDDEN);
  }

  @Get('/query')
  query(
    @Query() queryTodoDto: QueryTodoDto,
    @Query('title') title: string,
    @Headers() headers: any,
    @Ip() ip: string,
  ) {
    console.log('Headers: ', headers);
    console.log('Ip: ', ip);
    return (
      'Query Results: ' +
      title +
      '\n' +
      'queryTodoDto.id :' +
      queryTodoDto.id +
      ',\n' +
      'queryTodoDto.title :' +
      queryTodoDto.title
    );
  }

  @Get('/ab*cd')
  wildcard(@TodoDecorator() header: any) {
    console.log('Request header  Authorization : ', header.authorization);
    return 'wildcard';
  }

  @Get('/redirect')
  @Redirect('https://nestjs.com', 301)
  redirect(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get()
  async findAll(@Req() request: Request) {
    console.log(
      'TodoController getFindAll() Request.header :',
      request.headers,
    );
    return await this.todoService.findAll();
  }

  /*@Get(':id')
  findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),) id: string,)
  {
    return this.todoService.findOne(id);
  }*/

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    return await this.todoService.findOne(id);
  }

  @Post()
  //@UsePipes(new JoiValidationPipe(CreateTodoSchema))
  //@HttpCode(204)
  @Header('Cache-Control', 'none')
  async create(
    @Body(new DtoValidationWithClassValidatorPipe())
    createTodoDto: CreateTodoDto,
  ) {
    return await this.todoService.create(createTodoDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return await this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Todo> {
    return await this.todoService.remove(id);
  }
}
