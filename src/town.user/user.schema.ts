import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'user' })
export class User {

    @Prop({ required: true })
    _id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    hexPassword: string;

    @Prop({ required: true })
    mobile: string;

    @Prop({ required: true })
    createTime: string;

    @Prop({ required: true })
    updateTime: string;

    @Prop({ required: true })
    country: string;

    @Prop({ required: true })
    province: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    area: string;

    @Prop({ required: true })
    loginTime: string;

    @Prop({ required: true })
    lockTime: string;
}

export const UserSchema = SchemaFactory.createForClass(User);