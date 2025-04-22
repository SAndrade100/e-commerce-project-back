import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { email, password } = createUserDto;

        const userExists = await this.userModel.findOne({ email });
        if (userExists) {
            throw new BadRequestException('Este email já está em uso!');
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
        })

        const savedUser = await createdUser.save();
        return savedUser
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new BadRequestException('Usuário não encontrado!');
        }
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new BadRequestException('Usuário não encontrado!');
        }
        return user;
    }
    async update(id: string, UpdateUserDto: UpdateUserDto): Promise<User> {
        if (UpdateUserDto.password) {
            const salt = await bcrypt.genSalt();
            UpdateUserDto.password = await bcrypt.hash(UpdateUserDto.password, salt);
        }

        const updatedUser = await this.userModel
            .findByIdAndUpdate(id, UpdateUserDto, { new: true })
            .exec();

        if (!updatedUser) {
            throw new BadRequestException('Usuário não encontrado!');
        }

        return updatedUser;
    }

    async remove(id: string): Promise<User> {
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
        if (!deletedUser) {
            throw new BadRequestException('Usuário não encontrado!');
        }
        return deletedUser;
    }
}