const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const database = "phoneBook"
const url =
  `mongodb+srv://3210101621:${password}@cluster0.hwwo7q9.mongodb.net/${database}?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})
const Note = mongoose.model('Notemodel', noteSchema)
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
})
Note.find({ important: true }).then(result => {
  // ...
})
const note = new Note({
  content: 'HTML is Easy',
  important: true,
})

note.save().then(result => {
  console.log(result)
  console.log('note saved!')
  mongoose.connection.close()
})
