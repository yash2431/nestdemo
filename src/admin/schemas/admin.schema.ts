import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type AdminDocument = Admin & Document;

export enum AdminRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
}

@Schema({ timestamps: true, collection: 'admins' })
export class Admin {
  @ApiProperty({ example: 'John Doe' })
  @Prop({ required: true, trim: true })
  name: string;

  @ApiProperty({ example: 'admin@college.edu' })
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @ApiProperty({ enum: AdminRole, example: AdminRole.ADMIN })
  @Prop({ type: String, enum: AdminRole, default: AdminRole.ADMIN })
  role: AdminRole;

  @ApiProperty({ example: true })
  @Prop({ default: true })
  isActive: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
