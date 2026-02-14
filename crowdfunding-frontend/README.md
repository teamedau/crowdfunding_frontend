<img src="./crowdfunding-frontend\src\assets\logo-dark.png">

🔗[Twogther Netlify Link](https://twogther.netlify.app/)

Together is a modern community-driven fundraiser platform where people support each other through meaningful actions.

Instead of just donating money, users contribute through intentional participation, engagement, and shared goals; building stronger communities around purpose.

---

## 🚀 About the Project

Together allows users to:

- Create fundraisers in seconds  
- Invite friends and family to join  
- Support each other through meaningful actions  
- Track progress and community engagement  
- Experience the power of collective support  

This project was built as a dynamic, app-like experience focused on simplicity, clarity, and emotional connection.

---

## 🛠 Tech Stack

Frontend:
- React
- CSS (responsive design)

Backend:
- Django
- Django REST Framework
- Token Authentication

Database:
- SQLite (development)

---

## Project Requirements

- [☑️] Be separated into two distinct projects: an API built using the Django Rest Framework and a website built using React. 
- [☑️] Have a cool name: it's name is Twogther
- [☑️] Have a clear target audience: It's for communities, people feeling lonely, a platform for the AreUOk movement
- [☑️] Have user accounts. A user should have at least the following attributes:
  - [☑️] Username
  - [☑️] Email address
  - [☑️] Password
- [☑️] Ability to create a “fundraiser” to be crowdfunded which will include at least the following attributes:
  - [☑️] Title
  - [☑️] Owner (a user)
  - [☑️] Description
  - [✖️] Image: I started the development but it will stay to a next stage. People collect characters everytime they make a pledge. Some part is ready specially in styles. But it needs a bit more work
  - [☑️] Target amount to raise
  - [☑️] Whether it is currently open to accepting new supporters or not
  - [☑️] When the fundraiser was created
- [☑️] Ability to “pledge” to a fundraiser. A pledge should include at least the following attributes:
  - [☑️] An amount
  - [☑️] The fundraiser the pledge is for
  - [☑️] The supporter/user (i.e. who created the pledge)
  - [✖️] Whether the pledge is anonymous or not: This is not possible, because to make a pledge you need to be invited by the fundraiser owner. The idea is to highlight who does the pledge not hide
  - [☑️] A comment to go along with the pledge
- [☑️] Implement suitable update/delete functionality, e.g. should a fundraiser owner be allowed to update its description?
- [☑️] Implement suitable permissions, e.g. who is allowed to delete a pledge?
- [☑️] Return the relevant status codes for both successful and unsuccessful requests to the API.
- [✖️] Handle failed requests gracefully (e.g. you should have a custom 404 page rather than the default error page): I didn't have time to do this before submission
- [☑️] Use Token Authentication, including an endpoint to obtain a token along with the current user's details.
- [☑️] Implement responsive design.

## Print Screens

### Home

<img src="./crowdfunding-frontend\src\assets\ReadMe\screen1.png" alt="Home" width="800">

### About

<img src="./crowdfunding-frontend\src\assets\ReadMe\screen2.png" alt="About" width="800">

### Create a new fundraiser form

<img src="./crowdfunding-frontend\src\assets\ReadMe\screen3.png" alt="New Fundraiser Form" width="800">

### Login form

<img src="./crowdfunding-frontend\src\assets\ReadMe\screen4.png" alt="Login Form" width="800">

### Fundraisers & invitations

<img src="./crowdfunding-frontend\src\assets\ReadMe\screen5.png" alt="Fundraiser Lists" width="800">

<img src="./crowdfunding-frontend\src\assets\ReadMe\screen7.png" alt="Invitations" width="800">

### Dashboard

<img src="./crowdfunding-frontend\src\assets\ReadMe\screen6.png" alt="Dashboard" width="800">