import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'techCrunch' })
export class TechCrunch {

  @Prop()
  _id: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  name: string;

  @Prop()
  subtitle: string;

  @Prop()
  imageSrc: string;

  @Prop()
  date: string;

  @Prop()
  text: string;

  @Prop()
  createTime: string;

}

export const TechCrunchSchema = SchemaFactory.createForClass(TechCrunch);