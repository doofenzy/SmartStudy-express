import { Schema, model, Types } from 'mongoose';

export interface ISession {
  userId: Types.ObjectId;
  subject: string;
  topic: string;
  startime: Date;
  endTime: Date;
  notes: string;
  duration: number;
}

const SessionSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    topic: {
      type: String,
      required: true,
      trim: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number, // Duration in minutes
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Session = model<ISession>('Session', SessionSchema);
