### Medium Website

## Routes

There is nothing on the `/` route.

1. **Signup**: `/signup`
2. **Signin**: `/signin`
3. **See a Particular Blog**: `/blog/{id}`
4. **See All Blogs**: `/blogs`
5. **Post a Blog**: `/write`



## How to Bring the Project Locally

1. **Pull the Docker Image Locally**  
   Run the following command to pull the Docker image:
   ```bash
   docker pull abhijitjha/medium
   ```
2. **Create and Run a container**         
    Run the following command to run the container locally
    ```bash
    docker run -p 5173:5173 abhijitjha/medium
   ```

Now you can visit http://localhost:5173/{route} to access the Website.
