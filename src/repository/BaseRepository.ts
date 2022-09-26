import { Model } from 'mongoose';

export abstract class BaseRepository<T> {
  protected constructor(private model: Model<T>) {}

  async create(item: T): Promise<void> {
    await this.model.create(item);
  }

  async update(filter: any, item: Partial<T>): Promise<void> {
    await this.model.updateOne(filter, item);
  }

  async find(item: Partial<T>): Promise<any> {
    return this.model.find(item);
  }

  async findOne(filter: Partial<T>): Promise<any> {
    return this.model.findOne(filter);
  }
}
