import { Document} from 'mongoose';

export interface User extends Document{
  name: string;
  age: number;
  address: string;
  phone: Array<Record<'tel' | ' memo', string>>;
}