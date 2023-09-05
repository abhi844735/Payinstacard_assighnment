# Payinstacard_assighnment
## Tech Stacks 
  1. Node.js
  2. Express.js
  3. MongoDB
  4. JavaScript
  
## Packages
  1. Mongoose
  2. Express
  3. Bcrypt
  4. JsonwebToken
  5. Mongoose

## Api Endpoints


     for registering a user 
     1. Post Request = /user/signup => req.body = {name,email,gender,password} , Response ={message:"user registered successfully,status:201}.
     
     for logging a user 
     2. Post Request = /user/login => req.body = {email,password} , Response ={message:"user logged in successfully,status:200,token:"access-token"}.
        
        # below all are protected routes if not token then user cannot access this responses. care will be taken by auth middleware. 

     3. Get  Request (get all Posts) = /post/ => who ever the user has logged in only that posts data will come from database , Response={
        message:"all Posts",allPosts
     }

     4. Post Request (Add a Post) = /post/addPost => req.body = {title,description,userID} userId of the logged in user will be decoded from logged in user's token through auth middleware, Response={
        message:"post added successfully"
     }

     5. Patch Request (update a Post)= /post/update/:id =>req.body={updated body} only those post will be update which is created by that logged in user otherwise it will be response "not authorized", response={
        message:"post updated successfully"
     }

     6. Delete Request (delete a post)=/post/delete/:id =>only those post will be deleted which is created by that logged in user otherwise it will be response "not authorized", response={
        message:"post deleted successfully"
     }
     
     
   
  ## Authorization & Authentication
    1.Authentication middleware = It will check first , user is logged in or not, if user is not logged in it will give response please login again otherwise it will check for token , is token correct or not if correct than it will give permission of end points of rest full api's .
    

   

     
     
