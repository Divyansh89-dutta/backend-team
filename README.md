1. Register User
Endpoint: POST /api/auth/register

URL: http://localhost:5000/api/auth/register
Method: POST
Headers:
Content-Type: application/json
Body: (JSON)
json
Copy
Edit
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Expected Response:
Status: 201 Created
Response Body:
json
Copy
Edit
{
  "_id": "some_user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "generated_jwt_token"
}
2. Login User
Endpoint: POST /api/auth/login

URL: http://localhost:5000/api/auth/login
Method: POST
Headers:
Content-Type: application/json
Body: (JSON)
json
Copy
Edit
{
  "email": "john@example.com",
  "password": "password123"
}
Expected Response:
Status: 200 OK
Response Body:
json
Copy
Edit
{
  "_id": "some_user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "generated_jwt_token"
}
Error Response (Invalid Credentials):
json
Copy
Edit
{
  "message": "Invalid email or password"
}
3. Get User Profile
Endpoint: GET /api/auth/profile

URL: http://localhost:5000/api/auth/profile
Method: GET
Headers:
Content-Type: application/json
Authorization: Bearer <token> (Replace <token> with the JWT received from the login response)
Expected Response:
Status: 200 OK
Response Body:
json
Copy
Edit
{
  "_id": "some_user_id",
  "name": "John Doe",
  "email": "john@example.com"
}
Error Response (No Token):
json
Copy
Edit
{
  "message": "Not authorized, no token"
}
Error Response (Token Failed):
json
Copy
Edit
{
  "message": "Not authorized, token failed"
}
Steps to Test Organizer Registration, Login, and Event Creation:
Register an Organizer:

POST to /api/auth/register with the following body:
json
Copy
Edit
{
  "name": "Event Organizer",
  "email": "organizer@example.com",
  "password": "password123"
}
Response: You should get a response like:

json
Copy
Edit
{
  "_id": "user_id",
  "name": "Event Organizer",
  "email": "organizer@example.com",
  "token": "jwt_token"
}
Login as Organizer:

POST to /api/auth/login with the following body:
json
Copy
Edit
{
  "email": "organizer@example.com",
  "password": "password123"
}
Response: You should get a response like:

json
Copy
Edit
{
  "_id": "user_id",
  "name": "Event Organizer",
  "email": "organizer@example.com",
  "token": "jwt_token"
}
Create an Event (Only for Organizers):

POST to /api/events with the following body:
json
Copy
Edit
{
  "title": "Concert",
  "description": "A live concert event",
  "date": "2025-05-30",
  "time": "18:00",
  "venue": "City Hall",
  "ticketTypes": [
    {
      "type": "VIP",
      "price": 50,
      "quantity": 100
    },
    {
      "type": "General",
      "price": 30,
      "quantity": 200
    }
  ]
}
Headers:

Authorization: Bearer <jwt_token> (Use the token you received from the login step)
Response: You should get a response like:

json
Copy
Edit
{
  "_id": "event_id",
  "title": "Concert",
  "description": "A live concert event",
  "date": "2025-05-30T00:00:00.000Z",
  "time": "18:00",
  "venue": "City Hall",
  "ticketTypes": [
    {
      "type": "VIP",
      "price": 50,
      "quantity": 100
    },
    {
      "type": "General",
      "price": 30,
      "quantity": 200
    }
  ],
  "organizer": "user_id",
  "createdAt": "2025-02-06T00:00:00.000Z",
  "updatedAt": "2025-02-06T00:00:00.000Z"
}
