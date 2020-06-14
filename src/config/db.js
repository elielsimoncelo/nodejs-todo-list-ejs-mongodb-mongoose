var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Todo = new Schema({
    user_id    : String,
    content    : String,
    name    	: String,
    lastName    : String,
    updated_at : Date
});

const connectionProperties = { 
    url: "mongodb://localhost:27017/todo_list?authSource=admin",
    options:  {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
    }
};

mongoose.model( 'Todo', Todo );
mongoose.connect(connectionProperties.url, connectionProperties.options);