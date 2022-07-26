# Serverless app with clean architecture and TDD in node

This is a basic boilerplate that integrates a RESTful API in Nodejs using clean architecture with the serverless framework.
The code has been separated into branches, such that the transition from a monolithic architecture to a serverless architecture is clear.

## About the app

The application allows the user to create accounts with unique email addresses.

### Account creation body

```
{
  email: string
  firstName: string
  lastName: string
}
```

## How to run it

Install all the dependencies for the project locally and the serverless CLI globally via NPM: npm install -g serverless. As long as you have an instace of a mongodb server running, you will be able to run the application.
To run the application, use the following commands: serverless offline (using serverless architecture) or npm start (using the monolithic architecture)





