# Vote For Dinner App

## Features

- New users can self-service their registration, i.e., they should be able to
  register themselves and participate in dinner voting.
- At any given time, all registered users should be displayed on the page
- Anyone can self-service add a dinner option
- At any given time, all dinner options should be displayed on the page
- Registered users should be able to cast a single vote for dinner. If they
  vote twice, their previous vote should be overwritten.
- At any given time, all votes should be displayed on the page
- Users can be removed
- When a user is removed, their vote should also be removed
- Dinner options can be removed
- When a dinner option is removed, all votes should also be removed

### Bonus Features

- Validation on new users (e.g., does the name match a certain format,
  no blank names allowed, etc.)
- Validation on new dinners options
- Authentication on user removal (e.g., only a user may remove themselves)
- The Material Design Lite framework has been included in the page.
  Read this and incorporate elements to make things look nice:
  https://getmdl.io/

## Development Environment Set Up

1. If you do not already have one, create a Google account. This will be needed
   to access the Firebase console.

2. Send me your Google account, so I can add you to the Firebase application.

3. Install the Firebase CLI. You should already have node and npm installed.
   Run the following command:

   npm install -g firebase-tools

4. Sign the Firebase CLI in to your Google account by running the
   following command:

   firebase login

5. I have already created a repository and associated it with a Firebase
   application by running ```firebase init```, but normally you would do
   this for your own application. Clone the project repository. Here
   is the URL:

   git@github.com:fe-101-sea-nov-15-2016/vote-for-dinner.git

6. Make sure you can see the application in the Firebase Console:

   https://firebase.google.com

## Development Guidelines

Take a look at the project directory structure. Your changes will be made in
the ```public``` directory. You can consider this the document root when the
project is deployed.

Take a look at the index.html. There is a ```script``` tag in the head that
pulls in Firebase and configures the application. You will not need to
modify this, but know that it is there.

We will be using Firebase Hosting, which is a similar service to GitHub
Pages in that it puts your files on the Internet and makes them
available at a nice URL. This project will be available here:

    https://vote-for-dinner.firebaseapp.com

Today, I will be the only one deploying the application to avoid people
stepping on each others' toes, but with the Firebase CLI, this can
be done simply with the ```firebase deploy``` command.

For more details: https://firebase.google.com/docs/hosting/

When making changes, you can test them locally before committing and pushing
them using the ```firebase serve``` command.

Use branches, pull requests, and all other development best practices that
have been learned in class.

Do not push to ```master```.
