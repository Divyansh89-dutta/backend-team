```
# Project API Documentation & Postman Testing Guide

This documentation covers the authentication endpoints (register, login, profile), event management (create, update, delete events), ticket management (create, update, delete tickets), and the purchase process (including sending email notifications using Nodemailer). Follow the instructions below to test every endpoint in Postman.

## Table of Contents
1. User & Organizer Authentication
  - Register User / Organizer
  - Login User / Organizer
  - Get User Profile
2. Event Management
  - Create Event
  - Update Event
  - Delete Event
3. Ticket Management
  - Create Ticket for an Event
  - Update Ticket
  - Delete Ticket
  - Get a Single Ticket
4. Ticket Purchase & Notification (Nodemailer)
5. PayPal Payment Integration (Optional)
6. Postman Testing Steps Summary

## Environment Variables (.env)
If you are sending email notifications, ensure your .env file includes:
- `EMAIL_USER=your-email@gmail.com`
- `EMAIL_PASS=your-app-password`
- `PAYPAL_CLIENT_ID=your_paypal_client_id`
- `PAYPAL_CLIENT_SECRET=your_paypal_client_secret`

Make sure to include the proper values and add `.env` to your `.gitignore` file.
```

## User & Organizer Authentication
Register User / Organizer
Endpoint:
POST /api/auth/register
URL:-
`http://localhost:5000/api/auth/register`
Method:
POST
Headers:-
Body (JSON):-
-> `{ "name": "John Doe","email": "john@example.com","password": "password123"} `
Expected Response:
Status: 201 Created
-> `{"_id": "some_user_id","name": "John Doe","email": "john@example.com","token": "generated_jwt_token"}`

## Login User / Organizer
Endpoint:
POST /api/auth/login
URL:-
->`http://localhost:5000/api/auth/login`
method: POST
Headers:-
Body (JSON):-
-> `{"email": "john@example.com","password": "password123"}`
Expected Response:
Status: 200 OK
-> `{"_id": "some_user_id","name": "John Doe","email": "john@example.com","token": "generated_jwt_token"}`
Error (Invalid Credentials):
-> {"message": "Invalid email or password"}

## Get User Profile
Endpoint:
GET /api/auth/profile

URL:
->`http://localhost:5000/api/auth/profile`
Method:
GET

Headers:
Content-Type: application/json
Authorization: Bearer <token>
(Replace <token> with the JWT received from login)

Expected Response:
Status: 200 OK
->`{"_id": "some_user_id","name": "John Doe","email": "john@example.com"}`
 ## 2. Event Management
(Note: Only Organizers can create, update, or delete events.)

Create Event
Endpoint:
POST /api/events

URL:-
-> `http://localhost:5000/api/events`
Method:
POST
Headers:-
`{
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
}`
Update Event
(Assume a similar endpoint exists for updating events, e.g., PUT /api/events/:eventId)

Endpoint:
PUT /api/events/:eventId

URL:- `http://localhost:5000/api/events/<event_id>`
`{
  "title": "Updated Concert Title",
  "description": "Updated description",
  "date": "2025-06-01",
  "time": "19:00",
  "venue": "Updated Venue"
}`


Delete Event
Endpoint:
DELETE /api/events/:eventId

URL:-
->`http://localhost:5000/api/events/<event_id>`
Expected Response:-
`{
  "message": "Event deleted successfully"
}`

## Ticket Management
Create Ticket for an Event
Endpoint:
POST /api/tickets/:eventId/tickets

URL:
->`http://localhost:5000/api/tickets/<event_id>/tickets`
Method:
POST

Headers:-
`{
  "name": "VIP Ticket",
  "price": 150,
  "quantity": 50
}`
Expected Response:
Status: 201 Created
Update Ticket
Endpoint:
PUT /api/tickets/tickets/:ticketId

URL:-
`http://localhost:5000/api/tickets/tickets/<ticket_id>`
Body (JSON):-
`{
  "name": "Updated VIP Ticket",
  "price": 200,
  "quantity": 40
}`
Expected Response:
Returns the updated ticket object.

Delete Ticket
Endpoint:
DELETE /api/tickets/tickets/:ticketId

URL:
`http://localhost:5000/api/tickets/tickets/<ticket_id>`

Get a Single Ticket
Endpoint:
GET /api/tickets/tickets/:ticketId

URL:
`http://localhost:5000/api/tickets/tickets/<ticket_id>`

## Ticket Purchase & Notification (Nodemailer)
After a user buys a ticket, the server updates the ticket sold count and sends a purchase confirmation email to the email provided by the user.

Endpoint:
POST /api/tickets/purchase

URL:
`http://localhost:5000/api/tickets/purchase`

`{
  "ticketId": "ticket_id_here",
  "userEmail": "john@example.com",
  "quantity": 1
}`
Note: When this endpoint is hit, Nodemailer sends an email notification to the provided userEmail using the settings defined in utils/notification.js.
which will we sans to the userEmail Email in real time 