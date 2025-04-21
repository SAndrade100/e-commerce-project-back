import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum userRole {
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

    @Prop({ default: userRole.BUYER, enum: userRole })
    role: userRole;
}

export const UserSchema = SchemaFactory.createForClass(User);