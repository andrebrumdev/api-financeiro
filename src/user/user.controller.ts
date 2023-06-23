import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    const user = this.userService.create(createUserDto);
    res.status(200).send(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res) {
    const user = this.userService.update(id, updateUserDto);
    res.status(200).json(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    const user = await this.userService.remove(id);
    res.status(200).send(user);
  }
}
