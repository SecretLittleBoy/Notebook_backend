const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;
let phoneBook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];
app.get('/', (req, res) => { 
    res.send('<h1>Hello World!</h1>');
});
app.get('/api/persons', (req, res) => {
    res.json(phoneBook);
});
app.get('/info', (req, res) => { 
    res.send(`<p>Phonebook has info for ${phoneBook.length} people</p><p>${new Date()}</p>`);
});
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = phoneBook.find(person => person.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
});
app.delete('/api/persons/:id', (req, res) => { 
    const id = Number(req.params.id);
    phoneBook = phoneBook.filter(person => person.id !== id);
    res.status(204).end();  
});
const generateId = () => { 
    const maxId = phoneBook.length > 0
        ? Math.max(...phoneBook.map(n => n.id))
        : 0;
    return maxId + 1;
};
app.post('/api/persons', (req, res) => { 
    const body = req.body;
    if (!body.name) {
        return res.status(400).json({ 
            error: 'name missing' 
        });
    }
    if (!body.number) {
        return res.status(400).json({ 
            error: 'number missing' 
        });
    }
    if (phoneBook.find(person => person.name === body.name)) {
        return res.status(400).json({ 
            error: 'name must be unique' 
        });
    }
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    };
    phoneBook = phoneBook.concat(person);
    res.json(person);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));