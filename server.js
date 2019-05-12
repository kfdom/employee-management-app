const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API...'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/teams', require('./routes/api/teams'));
app.use('/api/roles', require('./routes/api/roles'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
