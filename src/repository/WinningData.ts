import { BaseRepository } from '@base/repository/BaseRepository';
import { IWinningData, WinningDataSchema } from '@base/schemas/winningNumbers';
import { Model } from 'mongoose';

export class WinningDataRepository extends BaseRepository<IWinningData> {
  constructor(private winningDataSchema: Model<IWinningData>) {
    super(winningDataSchema);
  }

  async getTotalSum(): Promise<any> {
    return this.winningDataSchema.aggregate([{ $match: {} }, { $group: { _id: null, amount: { $sum: '$number' } } }]);
  }

  async getSumByTypes(userId: string): Promise<any> {
    return this.winningDataSchema.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$type',
          amount: { $sum: '$number' },
        },
      },
    ]);
  }
}

export const winningDataRepository = new WinningDataRepository(WinningDataSchema);
