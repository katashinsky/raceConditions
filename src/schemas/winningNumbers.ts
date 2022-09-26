import { model, Schema } from 'mongoose';

export interface IWinningData {
  userId: string;
  type: string;
  number: number;
}

const winningDataSchema = new Schema<IWinningData>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  number: { type: Number, required: true },
});

export const WinningDataSchema = model<IWinningData>('WinningData', winningDataSchema);
