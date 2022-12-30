import { Request, Response } from 'express';
import { requestContent } from '../services/contentService';

export async function getContent(_req: Request, res: Response) {
  const { userId } = res.locals.payload;

  const content = await requestContent(userId);

  res.status(200).send(content);
}
