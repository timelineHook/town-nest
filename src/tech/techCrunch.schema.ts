import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TechCrunch extends Document {

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

}

export const TechDbSchema = SchemaFactory.createForClass(TechCrunch);