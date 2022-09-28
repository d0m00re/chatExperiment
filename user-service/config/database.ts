//import mongoose from  'mongoose';
import mongoose from 'mongoose';

const { MONGO_URI } = process.env;

console.log(process.env.MONGO_URI)

const connect = () => {
    if (!MONGO_URI)
    {
        console.log("* mongoose not found")
        process.exit(1)
    }
        // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
    //  useNewUrlParser: true,
    //  useUnifiedTopology: true,
    //  useCreateIndex: true,
    //  useFindAndModify: false,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};

export {
    connect
}