import { Types, Schema, model } from 'mongoose';

export interface IGoal {
  userId: Types.ObjectId;
  subject: string;
  weeklyTargetHours: string;
  completedHours: Date;
  weekStartDate: Date;
  weekEndDate: string;
}

const GoalSchema = new Schema(
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
    weeklyTargetHours: {
      type: Date,
      required: true,
    },
    completedHours: {
      type: Number,
      required: true,
    },
    weekStartDate: {
      type: Date,
      required: true,
    },
    weekEndDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Goal = model<'Goal'>('Goal', GoalSchema);
