import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
    BUYER = 'buyer',
    SELLER = 'seller',
}

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: UserRole.BUYER, enum: UserRole })
    role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);