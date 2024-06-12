/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { UuidService } from 'nestjs-uuid';
import { UserDto } from './user.model';

@Injectable()
export class UsersService {
  constructor(private readonly uuidService: UuidService) {}
  private users: UserDto[] = [];

  async createUser(userInfo: Partial<UserDto>): Promise<UserDto> {
    const id = this.uuidService.generate();
    const newUser = new UserDto(
      id,
      userInfo.name,
      userInfo.email,
      userInfo.phoneNumber,
      userInfo.address,
    );
    this.users.push(newUser);
    return newUser;
  }

  getAlluser() {
    return this.users;
  }

  getUser(userId: string) {
    const user = this.users.find((user) => user.id === userId);

    return user;
  }

  updateUser(userId: string, userInfo: UserDto) {
    const userIndex = this.users.findIndex((user) => user.id === userId);
    let updateUser = this.users[userIndex];
    updateUser = userInfo;
    this.users[userIndex] = updateUser;
  }

  deleteUser(userId: string) {
    const userIndex = this.users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }
    this.users.splice(userIndex, 1);
  }
}
