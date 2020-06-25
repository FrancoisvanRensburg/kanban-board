const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();

// Body-parser middleware
app.use(express.json({ extended: false }));

app.use('/api/projects', require('./routes/api/projects'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
