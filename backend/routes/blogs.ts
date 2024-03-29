import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from "hono/jwt"
import {createPostInput,updatePostInput} from "@abhijit-jha/medium-common"
const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string,
        authorId: string
    }
}>();
blogRoute.use('/*', async (c, next) => {
    const jwt = c.req.header('Authorization');
    if (!jwt) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
    const token = jwt.split(' ')[1];

    try {
        const payload = await verify(token, "MYSECRETPASSWORD");
        if (!payload) {
            c.status(401);
            return c.json({ error: "unauthorized" });
        }
        c.set('userId', payload.id);
        await next();     } catch (E) {
        console.log(E)
        c.status(500)
        c.json({
            "message": "Internal Server Error"
        })
    }
});


blogRoute.get('get/:id', async (c) => {
    const id = c.req.param('id');
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const data = await prisma.post.findFirst({
        where: {
            id: id
        },select:{
            id:true,
            title:true,
            content:true,
            createdAt:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    })
    console.log(id);
    return c.json({ data })
})

blogRoute.post('/post', async (c) => {
    const userId = c.get('userId');
    console.log(userId)
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());


    const payload = await c.req.json();
    const {success} = createPostInput.safeParse(payload)
    if(!success){
        c.status(403)
        return c.json({
            "message" : "Invalid inputs"
        })
    }
    const post = await prisma.post.create({
        data: {
            title: payload.title,
            content: payload.content,
            authorID: userId
        }
    });
    return c.json({
        id: post.id
    });
})
//to change a post
blogRoute.put('/edit-post', async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const changePayload = await c.req.json()
    const {success} = updatePostInput.safeParse(changePayload)
    if(!success){
        c.status(403)
        return c.json({
            "message" : "Invalid inputs"
        })
    }
    const updatedPayload = await prisma.post.update({
        where: {
            authorID: userId,
            id: changePayload.id
        },
        data: {
            title: changePayload.title,
            content: changePayload.content
        }
    })
    return c.json({ 'Updated Post': updatedPayload })
})

blogRoute.get("/bulk", async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
        
        const data = await prisma.post.findMany({
            select:{
                title:true,
                id:true,
                content:true,
                createdAt:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
        console.log(data)
        return c.json({ "data" : data });
    } catch (error) {
        
        console.error("Error fetching data:", error);
        c.status(403)
        return c.json({ error: "Internal Server Error" });
    }
});



blogRoute.delete("/delete-post", async (c) => {
    try {
        const payload = await c.req.json();


        if (!payload || !payload.id) {
            c.status(400);
            return c.json({ error: "Invalid payload" });
        }

        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
        console.log("HII")
        const deletedPost = await prisma.post.delete({
            where: { id: payload.id }
        });
        console.log("HII")

        
        if (!deletedPost) {
            c.status(404);
            return c.json({ error: "Post not found" });
        }

        
        return c.json({ message: "Post deleted successfully", deletedPost });
    } catch (error) {
        
        console.error("Error deleting post:", error);
        c.status(500);
        return c.json({ error: "Internal Server Error" });
    }
});



export default blogRoute