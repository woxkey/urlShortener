import express, {Express, Request, Response} from 'express';
import {linksRouter} from './routes/links.router';
import {collections, connectToDatabase} from './services/database.service';
import cors from 'cors';

const app: Express = express();
app.use(express.json());
app.use(cors());
app.use('/links', linksRouter);

connectToDatabase()
  .then(() => {
    app.use('/links', linksRouter);
    app.listen(process.env.PORT, () => {
      console.log(`Server started at http://localhost:${process.env.PORT}`);
    });

    app.get('/:shortUrl', async (req: Request, res: Response) => {
      try {
        const shortUrl = req.params.shortUrl;

        const link = await collections.links?.findOne({
          shortUrl: `${process.env.BASE_URL}/${shortUrl}`,
        });

        if (link) {
          res.status(301).redirect(link.originalUrl);
        } else {
          res.status(404).send('Not found');
        }
      } catch (err: unknown) {
        const error = err as Error;
        console.log(error);
      }
    });
  })
  .catch((error: Error) => {
    console.log('Database connection failed');
    console.log(error.message);
    process.exit();
  });
