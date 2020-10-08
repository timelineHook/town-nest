import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({collection: 'admin_user'})
export class AdminUser {
    @Prop({required: true})
    _id: string;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    username: string;

    @Prop({required: true})
    hexPassword: string;

    @Prop({required: true})
    jobNumber: string;

    @Prop({required: true})
    mobile: string;

    @Prop({required: false})
    image: string;

    @Prop({required: true})
    createTime: string;

    @Prop({required: true})
    updateTime: string;

    @Prop({required: false})
    loginTime: string;
}

export const AdminUserSchema = SchemaFactory.createForClass(AdminUser);