import { WinningTypes } from '@base/data/winningTypes';
import { IWinningValue } from '@base/interfaces/IWinnerPosition';
import { winningDataRepository, WinningDataRepository } from '@base/repository/WinningData';
import { binarySemaphoreDecorator } from '@base/decorators/BinarySemaphore.decorator';

export class BetService {
  constructor(private winningDataRepository: WinningDataRepository) {}

  @binarySemaphoreDecorator()
  public async getWinnerData(userId: string): Promise<IWinningValue> {
    const type = WinningTypes[Math.floor(Math.random() * 3)];
    const value = Math.floor(Math.random() * 1000);
    const winnerData = { type, value };

    const winnerNumberDataById = await this.winningDataRepository.findOne({ userId, type });

    !winnerNumberDataById
      ? await this.winningDataRepository.create({ userId, type, number: 1 })
      : await this.winningDataRepository.update({ userId, type }, { number: ++winnerNumberDataById.number });

    return winnerData;
  }
}

export const betService = new BetService(winningDataRepository);
