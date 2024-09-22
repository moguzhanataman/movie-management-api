// Contains domain errors
export const BusinessErrors = {
  Auth: {
    UserExists: 'User already exists',
  },
  Ticket: {
    NotFound: 'Ticket not found',
    MovieNotFound: 'Movie not found',
    MovieDeleted: "You can't ticket for deleted movie",
    MovieSessionNotFound: 'Movie session not found',
    UserNotFound: 'User not found',
    NotMyTicket: "You don't own this ticket",
  },
  Session: {
    MovieNotFound: 'Movie not found',
  },
};

// Contains general errors
export const GeneralErrors = {
  DBError: "Can't save to database",
};
