## About

Simple and Convenient Todo Development API Using Next.js and MongoDB

This project provides a straightforward and user-friendly API for developing Todo applications. It is built on the [Next.js](https://nextjs.org/) framework, leveraging [MongoDB](https://www.mongodb.com/) as the database for efficient data storage and retrieval. This setup ensures a seamless development experience, allowing for quick integration and manipulation of todo items within your application.

## Key Features:

- [x] Auth
  - login, registration, email acctivation
- [x] User
  - update user, change passwrod, forgot password
- [x] Todo
  - create, delete, update, order
- [x] Task
  - create, delete, update, order

> [!NOTE]
> Swagger documentation is implemented for this project and can be accessed at `http://localhost:4221` when the server is running locally. Alternatively, you can view an example of the documentation by following the provided [link](https://todo.vasyl.site/). Please ensure your local development environment is set up correctly and the server is running to access the Swagger UI at the specified local address.

## Installation

Open a Terminal in the project root and run...

> 1. Clone the repository to your local machine.
> 2. Navigate to the project directory and install the necessary dependencies:

```shell
yarn install
```

> [!IMPORTANT]
> You need to rename the `.env.example` file to `.env` and fill in the settings according to your application's requirements. This includes specifying all necessary environment variables such as database connection strings, API keys, secrets, and any other configurations that your application uses to operate.

> 3. Start the development server:

```shell
yarn start:dev
```

> 4. Access the API endpoints through http://localhost:3000/api

## Contributing:

Contributions are welcome! If you have suggestions for improving this API or want to report a bug, please feel free to open an issue or submit a pull request.

## License:

This project is released under the MIT License. Please refer to the LICENSE file for more details.
