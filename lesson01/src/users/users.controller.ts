import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {User} from "./interface/user.interface";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get() // GET /users or /user?role=value
  getAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.getAll(role);
  }

  @Get(':id') // Get /users/:id
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post() // POST /users
  create(@Body() user: Omit<User, 'id'>) {
    return this.usersService.create(user);
  }

  @Patch(':id') // PATCH /users/id
  update(@Param('id') id: string, @Body() updateUser: {username?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
    return this.usersService.update(+id, updateUser);
  }

  @Delete(':id') // DELETE /users/id
  remove(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
