import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';
export const collections: {links?: mongoDB.Collection} = {};

export const connectToDatabase = async () => {
  dotenv.config();
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING
  );
  await client.connect();
  const db: mongoDB.Db = client.db(process.env.DB_NAME);
  const linksCollection: mongoDB.Collection = db.collection(
    process.env.LINKS_COLLECTION_NAME
  );
  collections.links = linksCollection;
  console.log('Connected to database');
};
