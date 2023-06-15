const { default: mongoose } = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/bloggingApp', { useNewUrlParser: true });
const connection = mongoose.connection;
mongoose.set("strictQuery", false);
connection.once('open', () => {
    console.log("MongoDB Database connection established successfully");
});
