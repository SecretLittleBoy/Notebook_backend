const mongoose = require("mongoose");
if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
}
const password = process.argv[2];
const database = "phonebook";
const url = `mongodb+srv://3210101621:${password}@cluster0.hwwo7q9.mongodb.net/${database}?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose.connect(url);
const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: String,
});
const PhoneBook = mongoose.model("PhoneBook", phoneBookSchema);
if (process.argv.length === 3) {
    PhoneBook.find({}).then((result) => {
        result.forEach((phoneBook) => {
            console.log(phoneBook);
        });
        mongoose.connection.close();
    });
} else if (process.argv.length === 4) {
    PhoneBook.find({ name: process.argv[3] }).then((result) => {
        result.forEach((phoneBook) => {
            console.log(phoneBook);
        });
        mongoose.connection.close();
    });
} else {
    const phoneBook = new PhoneBook({
        name: process.argv[3],
        number: process.argv[4],
    });
    phoneBook.save().then((result) => {
        console.log(result);
        console.log("phoneBook saved!");
        mongoose.connection.close();
    });
}