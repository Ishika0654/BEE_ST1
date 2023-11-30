const express = require('express');
const mongoose = require('mongoose');
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
const connectionString = 'mongodb+srv://Ishika_Singla:ISHIKASINGLA@cluster0.ugghcpa.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/movies/:movieId/reviews', reviewRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port 3000`);
});
