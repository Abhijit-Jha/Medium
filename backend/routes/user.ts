import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from "hono/jwt"
import {signupInput,signinInput} from "@abhijit-jha/medium-common"
const userRoute = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string
	},
	Variables:{
		userId:string
	}
}>();

userRoute.post('/signup', async (c) => {
	console.log(c.env.JWT_SECRET)
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	const body = await c.req.json();
	const {success} = signupInput.safeParse(body)
	if(!success){
		c.status(403)
        return c.json({
            "message" : "Invalid inputs"
        })
	}
	try {
		const passwordBuffer = new TextEncoder().encode(body.password);
		const passwordDigest = await crypto.subtle.digest('SHA-256', passwordBuffer);
		const hashedPassword = Array.prototype.map.call(new Uint8Array(passwordDigest), (x: number) => ('00' + x.toString(16)).slice(-2)).join(''); console.log(hashedPassword)
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: hashedPassword,
				name: body.name
			}
		});
		const token = await sign({ id: user.id }, "MYSECRETPASSWORD")
		console.log(user, token)

		return c.json({
			token: token
		})
	} catch (e) {
		return c.text("error : " + e);
	}
})

userRoute.post('/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	const payload =await c.req.json()
	const {success} = signinInput.safeParse(payload)
	if(!success){
		c.status(403)
        return c.json({
            "message" : "Invalid inputs"
        })
	}
	const passwordBuffer = new TextEncoder().encode(payload.password);
	const passwordDigest = await crypto.subtle.digest('SHA-256', passwordBuffer);
	const hashedPassword = Array.prototype.map.call(new Uint8Array(passwordDigest), (x: number) => ('00' + x.toString(16)).slice(-2)).join('');
	try{
		const user = await prisma.user.findUnique({
			where:{
				email:payload.email,
				password : hashedPassword
			}
		})
		console.log(user)
		if(!user){
			return c.json({
				message : "Not Found"
			})
		}
		return c.json({
			"User" :user,
			"message" : "Done"
		})
		
	}catch(e){
		return c.json({
			error : e
		})
	}
})

export default userRoute