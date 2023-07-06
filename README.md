# SEA Cinema Movie Ticket Booking App

This is a movie ticket booking app for SEA Cinema, where users can browse movies, book tickets, manage their balance, and view transaction history. The app has two phases: the mandatory phase and the challenge phase. In the mandatory phase, users can perform basic functionalities such as browsing movies, booking tickets, and managing their balance. In the challenge phase, authentication and authorization features are added to enhance security and provide personalization for each customer.

## Features

- **Movies**: Browse movies and view movie details including title, description, age rating, poster, and ticket price.
- **Balance**: Top up and withdraw the balance in Rupiah. Maximum withdrawal amount is Min(current balance, 500.000) for each withdrawal.
- **Ticket Booking**: Book movie tickets by selecting available seats. Maximum number of tickets per transaction is 6. Fill out an identity form with name and age. Payment is deducted from the balance. If the age is below the movie's age rating, the user cannot continue the transaction.
- **Transaction History**: View the history of all successful transactions.
- **Cancellation**: Cancel a movie ticket transaction and refund the money to the balance. Canceled seats can be booked again.

## Installation and Usage

1. Clone the repository:

   ```shell
   git clone https://github.com/SaktiWidyatmaja/Sea-Cinema.git
   ```

2. Install dependencies:

   ```shell
   cd sea-cinema
   npm install
   ```

3. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following environment variables with their respective values:
     - `MONGODB_URI`: Your MONGODB URI for accessing the movie database.

4. Run the application:

   ```shell
   npm start
   ```

5. Access the application at `http://localhost:3000`.

## API Endpoints

The following API endpoints are available:

- `GET /seat-book/`: Get all booked seats.
- `GET /seat-book/:movieId/:time`: Get booked seats for specified movie and time.
- `GET /balance/`: Get balance.
- `POST /seat-book/`: Book a movie ticket for the specified movie.
- `PATCH /balance/`: Update the balance.
- `DELETE /cancel-book/:token`: Cancel the booked seats from specific transaction.

## Routes

The application supports the following routes:

- `/`: Home page to browse all movies.
- `/book/:id`: Book a movie ticket for the movie with the specified ID.
- `/history`: View transaction history and booking cancelation.
- `/top-up-withdrawal`: Top up and withdraw balance.

## Deployment

The application has been deployed to [Vercel](https://www.vercel.com/) at [https://sea-cinema.vercel.app](https://sea-cinema.vercel.app).