import express, { Application, Request, Response } from 'express';
const app: Application = express();
app.use(express.json());
const PORT = 3000;
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
