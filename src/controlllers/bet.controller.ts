import { Request, Response } from 'express';
import { BetService, betService } from '@base/services/bet.service';

export class BetController {
  constructor(private betService: BetService) {}

  public async getWinnerNumber(req: Request, res: Response) {
    const winnerData = await this.betService.getWinnerData(req.params.userId);
    return res.status(200).json(winnerData);
  }
}

export const betController = new BetController(betService);
