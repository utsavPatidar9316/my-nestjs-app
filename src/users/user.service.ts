import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async paginatedResult(
    search: string = '', // Optional search term
    sortBy: string = 'createdAt', // Default sorting by createdAt
    sortOrder: 'asc' | 'desc' = 'desc', // Default sort order is descending
    page: number = 1, // Default page number is 1
    limit: number = 10, // Default limit per page
  ): Promise<{ paginatedResults: User[]; totalCount: number }> {
    // Search query
    const match: { [key: string]: any } = {};
    const searchQuery = { $regex: search, $options: 'i' };

    if (search) {
      match['$or'] = [
        { name: searchQuery }, // Adjust fields to match your User schema fields
        { email: searchQuery }, // For example, name or email search
        { country: searchQuery },
      ];
    }

    // Determine sort order (-1 for descending, 1 for ascending)
    const sortDirection = sortOrder === 'asc' ? 1 : -1;

    // Build the sort object
    const sort: { [key: string]: any } = {};
    sort[sortBy] = sortDirection;

    // Aggregation pipeline for paginated results and total count
    const res = await this.userModel.aggregate([
      { $match: match }, // Filtering based on search
      { $sort: sort }, // Sorting
      {
        $facet: {
          paginatedResults: [
            { $skip: (page - 1) * limit }, // Skipping documents for pagination
            { $limit: limit }, // Limiting number of documents per page
          ],
          totalCount: [
            { $count: 'count' }, // Total count of matching documents
          ],
        },
      },
    ]);

    // Extract results and total count from the aggregation response
    const paginatedResults = res[0].paginatedResults;
    const totalCount = res[0].totalCount[0] ? res[0].totalCount[0].count : 0;

    return { paginatedResults, totalCount };
  }

  async findById(userId: string): Promise<User> {
    return this.userModel.findById(userId).exec();
  }

  async updateUser(
    userId: string,
    updateData: Partial<CreateUserDto>,
  ): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(userId, updateData, { new: true })
      .exec();
  }

  async deleteUser(userId: string): Promise<any> {
    return this.userModel.findByIdAndDelete(userId).exec();
  }
}
