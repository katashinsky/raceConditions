import { redisService, RedisService } from '@base/services/redis.service';

const LOCKED = 'LOCKED';
const UNLOCKED = 'UNLOCKED';

export class BinarySemaphore {
  constructor(private redisService: RedisService) {}

  public async setInitialValue() {
    await this.redisService.setDefaultFlag('done');
  }

  public async enter() {
    while ((await this.redisService.getWithSwitcher('done', LOCKED)) !== UNLOCKED);
  }

  public async leave() {
    if ((await this.redisService.getValueSafe('done')) === UNLOCKED) {
      console.error('Cannot leave unlocked BinarySemaphore');
    }
    await this.redisService.setValueSafe('done', UNLOCKED);
  }
}

export const binarySemaphore = new BinarySemaphore(redisService);
