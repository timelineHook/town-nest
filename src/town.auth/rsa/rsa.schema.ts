import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'auth_rsa' })
export class Rsa {
    @Prop({ required: true })
    _id: string;

    @Prop({ required: true })
    publicKey: string;

    @Prop({ required: true })
    privateKey: string;

    @Prop({ required: true })
    createTime: string;

    @Prop({ required: true })
    updateTime: string;

}
export const RsaSchema = SchemaFactory.createForClass(Rsa);