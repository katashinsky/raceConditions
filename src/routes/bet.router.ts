import * as express from 'express';
import { BetController, betController } from '@base/controlllers/bet.controller';

class BetRouter {
  constructor(private router: express.Router, private betController: BetController) {
    this.router.route('/:userId').get(this.betController.getWinnerNumber.bind(this.betController));
  }

  get betRouter() {
    return this.router;
  }
}

export const betRouter = new BetRouter(express.Router(), betController).betRouter;
