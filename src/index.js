const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const seedWithDummyData = require('../seeder');

dotenv.config();

// Connect to database
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/users';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to database');
    seedWithDummyData();
  })
  .catch(error => {
    console.log('Error connecting to database:', error);
  });

// Start server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// const app = require('./app');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const seedWithDummyData = require('../seeder');

// dotenv.config();

// //connect to DB
// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

// const url = process.env.DATABASE_URL || "mongodb://localhost:27017/users";
// mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
//     console.log('connected to DB');
//     seedWithDummyData();
// })


// app.listen(3000, () => console.log('Server running......'));
