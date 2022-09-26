import * as express from 'express';
import { UserController, userController } from '@base/controlllers/user.controller';

class UserRouter {
  constructor(private router: express.Router, private userController: UserController) {
    this.router.route('/:userId').get(this.userController.getWinnerPositions.bind(this.userController));
  }

  get userRouter() {
    return this.router;
  }
}

export const userRouter = new UserRouter(express.Router(), userController).userRouter;
