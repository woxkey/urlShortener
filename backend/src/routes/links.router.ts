import express, {Router, Request, Response} from 'express';
import {collections} from '../services/database.service';
import Link from '../models/links';
import shortid from 'shortid';
import {validateUrl} from '../../Util/util';

export const linksRouter: Router = express.Router();

linksRouter.get('/', async (req: Request, res: Response) => {
  try {
    const links = await collections.links?.find({}).toArray();
    res.status(200).send(links);
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
});

linksRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newLink = req.body as Link;

    if (!validateUrl(newLink.originalUrl)) {
      res.status(400).send('Invalid url link');
      return;
    }

    const originalLinkExists = await collections.links?.findOne({
      originalUrl: newLink.originalUrl,
    });

    if (originalLinkExists) {
      res.status(200).send(originalLinkExists);
      return;
    }
    let shortUrl;

    while (true) {
      const urlId = shortid.generate();
      shortUrl = `${process.env.BASE_URL}/${urlId}`;

      const shortUlrExists = await collections.links?.findOne({
        shortUrl: shortUrl,
      });

      if (!shortUlrExists) {
        break;
      }
    }
    newLink.shortUrl = shortUrl;
    await collections.links?.insertOne(newLink);
    res.status(200).send(newLink);
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).send(error.message);
  }
});
