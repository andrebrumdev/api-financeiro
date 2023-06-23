import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ICreateUserDTO } from './dto/create-user.dto';
import { validateOrReject } from 'class-validator';
import { User } from './entities/users.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('')
  async create(@Body() createUserDto: ICreateUserDTO, @Res() res) {
    try{  
      await validateOrReject(createUserDto);
      const userExecuted = this.userService.execute(createUserDto);
      const user = await this.userService.create(userExecuted);
      res.status(HttpStatus.CREATED).send(user);
    }
    catch(errors){
      console.log("Caught promise:"+ errors);
      res.status(HttpStatus.METHOD_NOT_ALLOWED).send("Values error");
    }
  }

  @Get('/all')
  async findAll(@Res() res, @Query('filter') filter: string) {
    try {
      const users = await this.userService.findAll(JSON.parse(filter)) as User[];
      return res.status(200).send(users);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch users' });
    }
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
