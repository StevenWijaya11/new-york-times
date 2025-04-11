export const NetworkError = {
  ECONNABORTED: {
    code: 'NETWORK_UNSTABLE',
    message: 'Your network is unstable. Please try again later.',
  },
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    message: 'Unauthorized access. Please contact support.',
  },
  BAD_REQUEST: {
    code: 'BAD_REQUEST',
    message: 'Bad request sent to the server. Please check your input.',
  },
  FORBIDDEN: {
    code: 'FORBIDDEN',
    message: 'You do not have permission to access this resource.',
  },
  SERVER_ERROR: {
    code: 'SERVER_ERROR',
    message: 'An error occurred on the server. Please try again later.',
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    message: 'Requested resource was not found.',
  },
  TOO_MANY_REQUESTS: {
    code: 'TOO_MANY_REQUESTS',
    message: 'You have sent too many requests in a short period. Please try again later.',
  },
};
