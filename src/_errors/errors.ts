// Contains domain errors
export const BusinessErrors = {
  Auth: {
    UserExists: 'User already exists',
  },
  Ticket: {
    MovieNotExists: 'Movie that you trying to purchase ticket for does not exists',
    MovieDeleted: "You can't ticket for deleted movie",
    UserNotExists: 'User does not exists',
  },
};

// Contains general errors
export const GeneralErrors = {
  DBError: "Can't save to database",
};
