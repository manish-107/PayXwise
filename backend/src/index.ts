import { Hono } from 'hono'
import { userRouter } from './routes/userRouter'
import { cors } from 'hono/cors';

const app = new Hono()

app.use(cors({
  origin: '*', // Allow all origins
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));


app.get('/demo',async(c)=>{
    console.log("hello");
    return c.json({msg:"hello"});
})

app.route('/api/v1/users',userRouter);

export default app
