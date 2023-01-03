# Twitter clone

Welcome to the Twitter clone project. This project is a simple Twitter clone that allows users to post messages to a public stream.

This app was inspired by the TomDoesTech tutorial on YouTube. You can find the tutorial [here](https://www.youtube.com/watch?v=nzJsYJPCc80).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have Node.js and npm installed on your machine in order to run this project.

### Installing

1. Clone the repository to your local machine

```
git clone https://github.com/vhalchuk/twitter-clone.git
```

2. Navigate to the project directory

```
cd twitter-clone
```

3. Install the dependencies

```
npm install
```

4. Create .env file in the root directory and add the following environment variables as shown in [.env.example](.env.example)

5. Push the database schema to your local mySQL database

```
npx prisma db push
```

6. Seed the database with mock data

```
npx prisma db seed
```

The app will now be running on [http://localhost:3000](http://localhost:3000)

## Built With [T3 stack](https://create.t3.gg/)

- [Typescript](https://www.typescriptlang.org/) - The language used
- [React](https://reactjs.org/) - The web framework used
- [tRPC](https://trpc.io/) - The API framework used
- [Prisma](https://prisma.io/) - The database framework used
- [Tailwind CSS](https://tailwindcss.com/) - The CSS framework used
- [Next.js](https://nextjs.org/) - The front end framework used
- [NextAuth.js](https://next-auth.js.org/) - The authentication framework used

## Author

Volodymyr Halchuk

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
