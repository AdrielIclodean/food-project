# CarsProject

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# AWS Integration
Besides all the angular components that were created, I integrated with AWS services
- for authenticating the service, I used AWS Cognito:
    1. Created a new User Pool
    2. On this pool I created a new App client
    3. I also created a new Identity pool
- For storing all the data I used DynamoDB:
    1. Create a table named Cars:
        - partition key: name(String), for now no sorting key required
    2. add some entries like:
    {
  "name": {
    "S": "Ferrari F80"
  },
  "maxSpeed": {
    "S": "217.5 miles/hour"
  },
  "id": {
    "N": "1"
  },
  "imageUrl": {
    "S": "https://cars-images-b.s3.eu-central-1.amazonaws.com/ferrari-F80.png"
  },
  "price": {
    "S": "3.6 Million"
  },
  "stars": {
    "N": "5"
  },
  "tags": {
    "L": [
      {
        "S": "Fast"
      },
      {
        "S": "Costly"
      }
    ]
  }
}