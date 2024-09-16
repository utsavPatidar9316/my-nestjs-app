import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<User> {
    return this.userService.findById(userId);
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateData: Partial<CreateUserDto>,
  ): Promise<User> {
    return this.userService.updateUser(userId, updateData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<any> {
    return this.userService.deleteUser(userId);
  }

  @Post('search')
  async getAllUsersData(
    @Body('search') search: string, // Search keyword
    @Body('sortBy') sortBy: string, // Field to sort by
    @Body('sortOrder') sortOrder: 'asc' | 'desc', // Sort direction
    @Body('page') page: number, // Page number
    @Body('limit') limit: number, // Limit per page
  ): Promise<{ paginatedResults: User[]; totalCount: number }> {
    // Pass the body params to the service method
    return this.userService.paginatedResult(
      search,
      sortBy,
      sortOrder,
      page,
      limit,
    );
  }
}
