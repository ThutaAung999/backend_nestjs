import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Controller('/api/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')

  /*create(@Body() createUserDto: CreateUserDto) {
      return this.userService.create(createUserDto);
    }*/
  async create(
    @Body('password') password: string,
    @Body('username') username: string,
  ) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const createUserDto = new CreateUserDto();
    createUserDto.username = username;
    createUserDto.password = hashedPassword;

    //const result = await this.userService.create({ username, hashedPassword });
    const result = await this.userService.create(createUserDto);
    return result;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
