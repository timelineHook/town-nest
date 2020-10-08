import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({collection: 'admin_user_log'})
export class AdminUserLog {
    @Prop({required: true})
    _id: string;

    @Prop({required: true})
    createTime: string;

    @Prop({required: true})
    operation: string;

    @Prop({required: true})
    ip: string;
}

export const AdminUserLogSchema = SchemaFactory.createForClass(AdminUserLog);