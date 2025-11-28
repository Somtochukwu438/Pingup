import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';
import storyRouter from './routes/storyRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import { clerkMiddleware } from '@clerk/express'
import {inngest, functions} from './inngest/index.js'
import {serve} from 'inngest/express'

const app = express();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

await connectDB();

app.use('/api/user', userRouter);
app.use('/api/post', postRouter)
app.use('/api/story', storyRouter)
app.use('/api/message', messageRouter)
// 🔹 test route – should bypass everything
app.get('/test', (req, res) => {
  console.log('GET /test hit');
  res.send('Server is alive');
});

app.get('/', (req, res) => res.send('Server is running'));
setInterval(() => {
    console.log('tick - server still alive');
  }, 5000);

  
app.use('/api/inngest', serve({ client: inngest, functions }))
  

const PORT = 4000;

app.listen(PORT, () => console.log(`MINI server running on port ${PORT}`));
