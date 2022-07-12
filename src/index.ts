import express, { Application, Request, Response } from 'express';
import rateLimit, { MemoryStore } from 'express-rate-limit';
import morgan from 'morgan';
import helmet from 'helmet';
import { HeddleError } from './middlewares/error.middleware';
import config from './config';
import router from './routes';
const app: Application = express();
const ApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  store: new MemoryStore(),
  message: 'Too many requests from this IP, please try again in 15 minutes ',
  statusCode: 429,
});
const PORT = config.port || 3000;
app.use(helmet());
app.use(morgan('common'));
app.use(ApiLimiter);
app.use(express.json());
app.use('/api', router);
app.use(HeddleError);
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found 😅' });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
