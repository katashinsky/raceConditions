import { Request, Response } from 'express';
import { userService, UserService } from '@base/services/user.service';

export class UserController {
  constructor(private userService: UserService) {}

  public async getWinnerPositions(req: Request, res: Response) {
    return res.status(200).json(await this.userService.getWinnerPositions(req.params.userId));
  }
}

export const userController = new UserController(userService);
