    import mongoose from 'mongoose';

    const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log('Connected to the database');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
    };

    export default dbConnect;
