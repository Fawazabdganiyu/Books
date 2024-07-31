import app from './app';
import dbClient from './config/database';
import env from './config/environment';

// Connect to the database
dbClient.connect();

// Start the express server
const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
