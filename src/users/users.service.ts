import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor( @InjectModel(User.name) private userModel: Model<User>){}
  
  create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel({...createUserDto});
    return newUser.save();
  }
  findAll() {
    return this.userModel.find();
  }
  findOne(id: string) {
    return this.userModel.findById(id);
  }
  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id,updateUserDto,{new:true})
  }
  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
