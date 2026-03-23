// Get user by username
export const getUserByUsernameQuery = `
  SELECT user_uid, username, email, password_hash, created_at 
  FROM users 
  WHERE username = $1
`;

// Get user by ID
export const getUserByIdQuery = `
  SELECT user_uid, username, email, created_at 
  FROM users 
  WHERE user_uid = $1
`;

// Create new user
export const createUserQuery = `
  INSERT INTO users (user_uid, username, email, password_hash)
  VALUES ($1, $2, $3, $4)
  RETURNING user_uid, username, email, created_at
`;

// Check if username exists
export const checkUsernameQuery = `
  SELECT 1 FROM users WHERE username = $1
`;

// Check if email exists
export const checkEmailQuery = `
  SELECT 1 FROM users WHERE email = $1
`;
