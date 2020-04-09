import mongoose from 'mongoose';

async function databaseSetUp() {
  const connected: boolean = await connectToDatabase();
  if (!connected) {
    process.exit(1);
  }
}

async function connectToDatabase(): Promise<boolean> {
  const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
  try {
    await mongoose.connect('mongodb://localhost/tickets', connectionOptions);
    console.log('Connected to database');
    return true;
  } catch (error) {
    console.log('Error connecting to database', error);
    return false;
  }
}

export { databaseSetUp };