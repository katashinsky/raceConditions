import { IWinnerPosition, IWinningNumber } from '@base/interfaces/IWinnerPosition';
import { WinningDataRepository, winningDataRepository } from '@base/repository/WinningData';

export class UserService {
  constructor(private winningDataRepository: WinningDataRepository) {}

  public async getWinnerPositions(userId: string): Promise<IWinnerPosition> {
    const winningData = await this.winningDataRepository.find({});
    const totalSum = await this.winningDataRepository.getTotalSum();
    const sumByTypes = await this.winningDataRepository.getSumByTypes(userId);

    return {
      totalSumWinningNumber: totalSum[0].amount,
      allWinningNumbers: winningData.map(({ type, number }: IWinningNumber) => ({ type, number })),
      totalSumByTypes: sumByTypes.map((item: any) => ({ type: item._id, number: item.amount })),
    };
  }
}

export const userService = new UserService(winningDataRepository);
