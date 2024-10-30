const express = require('express');
const cors = require('cors');
const database = require('./config/database');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

app.listen(8001, () => {
    console.log(`Server is running on port 8001`);
});