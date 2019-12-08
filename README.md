# weDevs

# Instruction

If you cannot create user then you must replace the 'adminToken' in Signup.js as wordpress doesn't
no longer support the create api without the any token. So with postman
POST http://localhost:8000/wp-json/jwt-auth/v1/token (with admin username and password) and replace the token and you will able to create users.

Thank you and I was running the wordpress in the localhost 8000