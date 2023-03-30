# SOCIAL MEDiA API

## Dependencies

> "bcrypt": "^5.1.0",

> "dotenv": "^16.0.3",

> "express": "^4.18.2",

> "jsonwebtoken": "^9.0.0",

> "mongoose": "^7.0.1"

## Endpoints

- /api/register
- /api/login [Please login as it's needed for creating post and update them]
- /api/flight
- /api/user [will give you all the user in collection]
- /api/user/:id/friends  [GET]  [All the friends of that particular user]
- /api/user/:id/friends  [POST]  [Send Friend request to the user ] [authentication required]
- /api//user/:id/friends/friendid   [PUt/PATCH]  [You must be logged in with same I'd to accept the request][Body required]
- /api/post [details of all the post]
- /api/:id  [details of that specific post]
- api/post [POST request] [login to create the post]
- api/post/:id [put] [update post body required]
- api/:id [delete request]
- api/:id /like [like the post]
- api/:id /comment [comment on the post]
 
### POST: /api/register

- User with the same email can not register

> **body***: `{name, email, password,dob,bio}`



