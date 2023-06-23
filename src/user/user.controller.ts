import { Controller, Get, Post, Body, Patch, Param, Delete, Res} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ICreateUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: ICreateUserDTO, @Res() res) {
    const userExecuted = this.userService.execute(createUserDto);
    const user = await this.userService.create(userExecuted);
    res.status(200).send(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res) {
    const userExecuted = this.userService.execute(updateUserDto);
    const user = await this.userService.update(id, userExecuted);
    res.status(200).json(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    const user = await this.userService.remove(id);
    res.status(200).send(user);
  }
}
