import mongoose from "mongoose";

class BaseRepository<T> {
  constructor(public model: mongoose.Model<T>) {}

  async insertMany(payload: object[]) {
    return await this.model.insertMany(payload);
  }

  async insertOne(payload: object) {
    return await this.model.create(payload);
  }

  async findOne(filter: object, select: string = "") {
    return await this.model.findOne(filter).select(select);
  }

  async updateOne(filter: object, payload: object) {
    return await this.model.findOneAndUpdate(filter, payload, {
      new: true,
    });
  }

  async findById(id: string, select: string = "") {
    return await this.model.findById(id).select(select).lean();
  }

  async updateOneById(id: string, payload: object) {
    return await this.model.findByIdAndUpdate(id, payload, { new: true });
  }
}

export default BaseRepository;
