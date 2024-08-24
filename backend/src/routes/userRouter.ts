import { Hono } from 'hono';
import z from 'zod';

export const userRouter = new Hono();

const signupInput = z.object({
     email:z.string().email(),
     fullName:z.string(),
     phoneNumber:z.string(),
     password:z.string().min(6),
     gender:z.enum(['male','female']),
     securityQuestion:z.enum(['1','2','3']),
     securityAnswer:z.string()
})

userRouter.post('/signup',async(c)=>{
     try {
          
     const body = await c.req.json();
     const parseResult = signupInput.safeParse(body);

    if (!parseResult.success) {
      return c.json({ error: 'Invalid input', details: parseResult.error.errors }, 400);
    }

     return c.json({msg:body})
     } catch (error) {
        console.log(error)  
     }
})

userRouter.get('/getUser',async(c)=>{
     return c.json({msg:"hello"});
})
