import {Injectable, NotFoundException} from '@nestjs/common';
import { randomInt } from 'crypto';
import { User } from './interface/user.interface';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  private users = [
    {
      id: 7299308098380461,
      username: 'Dominic',
      email: 'Adolph.Beahan@hotmail.com',
      role: 'ADMIN',
    },
    {
      id: 4641414017009990,
      username: 'Zane',
      email: 'Francesca.Strosin68@gmail.com',
      role: 'INTERN',
    },
    {
      id: 5853908342049769,
      username: 'Lavada',
      email: 'Rubye35@hotmail.com',
      role: 'ENGINEER',
    },
    {
      id: 1994884181309653,
      username: 'Joelle',
      email: 'Yasmine_Cole@hotmail.com',
      role: 'ADMIN',
    },
    {
      id: 8733052866175101,
      username: 'Mariane',
      email: 'Cullen.Ortiz@yahoo.com',
      role: 'INTERN',
    },
    {
      id: 5397585683377609,
      username: 'Maria',
      email: 'Jade71@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 5254596763241332,
      username: 'Xander',
      email: 'Chadd_Wilderman42@hotmail.com',
      role: 'ADMIN',
    },
  ];

  getAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const roleArray = this.users.filter((user) => user.role == role);

      if (! roleArray.length) {
        throw new NotFoundException('User role not found');
      }
      return roleArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id == id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const id = randomInt(10000000);

    const newUser: User = { id, ...createUserDto };

    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updateUserDto: UpdateUserDto,
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removeUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);

    return removeUser;
  }
}
