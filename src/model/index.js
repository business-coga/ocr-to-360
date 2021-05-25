const mongoose = require('mongoose')
const Schema = mongoose.Schema


const contactSchema = new Schema({}, { strict: false });
const model = {
    contact :  mongoose.model('contact',contactSchema)
}

mongoose.connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err)=>{
    if(err)
        console.log(err)
    console.log('Connect Database success!')
});


module.exports = model