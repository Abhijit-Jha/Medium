import { Hono } from 'hono';
import userRoute from '../routes/user';
import blogRoute from '../routes/blogs';
import { cors } from 'hono/cors'

// Create the main Hono app
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string
	},
	Variables:{
		userId:string
	}
}>();

app.use('/api/*', cors())
app.route("/api/v1/user",userRoute)
app.route("/api/v1/blog",blogRoute)

// app.delete("/delete",async(c)=>{
// 	const prisma = new PrismaClient({
// 		datasourceUrl: c.env.DATABASE_URL,
// 	}).$extends(withAccelerate());
// 	await prisma.user.deleteMany({})
// 	return c.json({"deleted" : "done"})
// })
export default app;
