import mongoose from "mongoose";

class BaseRepository<T> {
  constructor(public model: mongoose.Model<T>) {}

  async insertMany(payload: object[]) {
    return await this.model.insertMany(payload);
  }

  async insertOne(payload: object) {
    return await this.model.create(payload);
  }

  async findOne(filter: object) {
    return await this.model.findOne(filter).lean();
  }

  async findOneAndUpdate(filter: object, payload: object) {
    return await this.model
      .findOneAndUpdate(filter, payload, { new: true })
      .lean();
  }

  async findById(id: string) {
    return await this.model.findById(id).lean();
  }

  async findByIdAndUpdate(id: string, payload: object) {
    return await this.model.findByIdAndUpdate(id, payload, { new: true });
  }
}

export default BaseRepository;
