# GoRide

## 

## Description

If you enjoy driving, GoRide is your App. Here you will be able to create or join driving events, where you can meet new people, go for a route, enjoy a meeting with other people... It does not matter if you ride car or motorbike, GoRide is made for everyone.



## 

## User Stories

- **Signup:** As an anon I can sign up in the platform so that I can start searching for events
- **Login:** As a user I can login to the platform so that I can search, create and join new events
- **Logout:** As a user I can logout from the platform so no one else can use it
- **List of Events** As a user I can see the list of all the events.
- **Filter Events** As a user I can search events by name or filter the list of events by the creator of the event, where is it going to be and when, having the possibility to filter by Today, Tomorrow, This weekend, This week and All.
- **Details of the event** As a public user I can see the details of each event but not the profiles of the participants.
- **Joining events** As a registered user I can Join an event and see the participant's profile.
- **Add an event** As a user I can create new riding events.
- **User profile** As a logged user I can see, edit or delete my profile, and see other rider profiles. 
- **User Calendar** As a user I can see a calendar with the events I joined previously.
- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist



## Backlog



## Endpoints (REST API)

| Method | Path                           | Body                                                         | Description                           |
| ------ | ------------------------------ | ------------------------------------------------------------ | ------------------------------------- |
| post   | /auth/signup                   |                                                              | Register a new user                   |
| post   | /auth/login                    |                                                              | Sign the user in                      |
| post   | /auth/logout                   |                                                              | Log the user out. Destroy the session |
| get    | /auth/me                       |                                                              | Check if an user is logged in         |
| post   | /api/files                     |                                                              | Upload pictures to cloudinary         |
| put    | /api/event/join/:eventId/:id   |                                                              | Allows an user to join an event       |
| put    | /api/event/leave/:eventId/:id  |                                                              | Allows an user to leave an event      |
| get    | /api/event                     |                                                              | Get all the events                    |
| get    | /api/event/future              | via req.query                                                | Get all future events                 |
| get    | /api/event/:eventId            |                                                              | Get an event                          |
| get    | /api/event/:userId/participant |                                                              | Get events where user is participant  |
| post   | /api/event                     | {name, avatar, comments, pictures, description, startTime, endTime, city, participants} | Create an event                       |
| delete | /api/event/:eventId            |                                                              | Delete an event                       |
| get    | /api/event/name/:eventName     |                                                              | Get event by name                     |
| put    | /api/event/:eventId            | {name, avatar, comments, pictures, description, startTime, endTime, city, participants} | Update event                          |
| get    | /api/event/pictures/:eventId   |                                                              | Get pictures of an event              |
| get    | /api/event/user/:userId        |                                                              | Get all events of a person            |
| put    | /api/user                      | {username, password, email, avatar, age, genre, vehicle}     | Edit profile                          |
| get    | /api/user/:id                  |                                                              | Get user details by id                |



## Components



## Models

Person model

```javascript
{
    age: {
        type: Number,
        min: 18
    },
    genre: {
        type: String,
        enum: ['Male', 'Female']
    },
    vehicle: {
        type: [String],
        enum: ["motorbike, car"],
        minlength: 1,
    },
    calendar: [Date],

}
```

User model

```javascript
{
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    avatar: {
        type: String, 
        default: "avatar.png"
    },
    personDetails: { type: Schema.Types.ObjectId, ref: "Person" },
    createdEvents: [{type: Schema.Types.ObjectId, ref: "Event" }]
}
```

Event model

```javascript
{

    owner: { type: Schema.Types.ObjectId, ref: "User" },
    name: {
        type: String,
        required: true,
        maxlength: 40,
        minlength: 2,
        unique: true, 
    },
    avatar: {
        type: String,
        default: "avatar.png"
    },
    comments: {
        type: [{
            message: String,
            owner: { type: Schema.Types.ObjectId, ref: "User" }
        }],
        default:[]
    },
    pictures: {
        type: [String],
        default: []
    },
    description: {
        type: String,
        required: true,
        maxlength: 500
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    participants: [{type: Schema.Types.ObjectId, ref: "User"}]
}
```



## Links

### 

### Trello/Kanban

[Link to my Trello](https://trello.com/b/ekUkw2Vw/goride) 

### Git/Deploy



### Prezi