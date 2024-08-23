import {Hono} from 'hono'

export const userRouter = new Hono();

userRouter.post('/signup',async(c)=>{
     return c.text("hello")
})

userRouter.get('/getUser',async(c)=>{
     return c.json({msg:"hello"});
})
