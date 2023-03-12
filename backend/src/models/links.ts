import {ObjectId} from 'mongodb';

export default class Link {
  constructor(
    public originalUrl: string,
    public shortUrl: string,
    public id?: ObjectId
  ) {}
}
