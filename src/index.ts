import express, { Application, Request, Response } from 'express';
import rateLimit, { MemoryStore } from 'express-rate-limit';
import morgan from 'morgan';
import helemt from 'helmet';
import { HeddleError } from './middlewares/error.middleware';
import config from './config';
const app: Application = express();
const ApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  store: new MemoryStore(),
  message: 'Too many requests from this IP, please try again in 15 minutes ',
  statusCode: 429,
});
app.use(helemt());
app.use(morgan('common'));
app.use(ApiLimiter);
app.use(express.json());
const PORT = config.port || 3000;
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World! 🌍' });
});
app.post('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World! 🌍 from post',
    body: req.body,
  });
});
app.use(HeddleError);
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found 😅' });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
