const mongoose=require('mongoose')
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/myyyy', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("connected gh successfully done");
    } catch (e) {
        console.log("something went wrong", e);
    }
};
module.exports=connectDB;