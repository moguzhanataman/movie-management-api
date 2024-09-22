// Contains domain errors
export const BusinessErrors = {
  Auth: {
    UserExists: 'User already exists',
  },
  Ticket: {
    MovieNotExists: 'Movie not found',
    MovieDeleted: "You can't ticket for deleted movie",
    MovieSessionNotFound: 'Movie session not found',
    UserNotExists: 'User not found',
  },
};

// Contains general errors
export const GeneralErrors = {
  DBError: "Can't save to database",
};
