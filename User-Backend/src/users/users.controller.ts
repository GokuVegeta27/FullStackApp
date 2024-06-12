/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.model';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async adduser(
    @Body() userDto: UserDto,
  ): Promise<UserDto> {

    try {
      return await this.userService.createUser(userDto);
    } catch (error) {
      throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async gettAlluser() {
    try {
      return await this.userService.getAlluser();
    } catch (error) {
      throw new HttpException('Error updating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getUser(@Param('id') userId: string) {
    try {
      const user = await this.userService.getUser(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new HttpException('Error retrieving user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() userDto: UserDto,

  ) {
    try {
      return await this.userService.updateUser(userId, userDto);
    } catch (error) {
      throw new HttpException('Error updating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string) {
    try {
      return await this.userService.deleteUser(userId);
    } catch (error) {
      throw new HttpException('Error deleting user', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
}
