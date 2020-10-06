import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

const defaultProp = {required: false, default: ''};

@Schema({ collection: 'user' })
export class User {

    @Prop({ required: true })
    _id: string;

    @Prop(defaultProp)
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

    @Prop(defaultProp)
    country: string;

    @Prop(defaultProp)
    province: string;

    @Prop(defaultProp)
    city: string;

    @Prop(defaultProp)
    area: string;

    @Prop(defaultProp)
    loginTime: string;

    @Prop(defaultProp)
    lockTime: string;
}

export const UserSchema = SchemaFactory.createForClass(User);