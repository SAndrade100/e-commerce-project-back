import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

@Schema({ timestamps: true })
export class Product extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    imageUrl: string;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true, default: 0 })
    stock: number;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    seller: User;
}

export const ProducSchema = SchemaFactory.createForClass(Product);