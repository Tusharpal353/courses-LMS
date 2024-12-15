    import mongoose from 'mongoose';

    const dbConnect = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL is not defined in the environment variables.");
        }
        await mongoose.connect(process.env.MONGODB_URL, {
       
        });
        console.log('Connected to the database');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
    };

    export default dbConnect;
