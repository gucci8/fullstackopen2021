require("dotenv").config()
const express = require("express");
const app = express();
var morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

morgan.token("body", (req) => JSON.stringify(req.body));

app.use(express.json());
app.use(cors());
app.use(express.static("build"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

const generateId = () => {
  let id = Math.floor(Math.random() * 10000);
  while (persons.map((p) => p.id).includes(id)) {
    id = Math.floor(Math.random() * 10000);
  }
  return id;
};

app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person);
  });
});

app.get("/info", (request, response) => {
  const date = new Date();
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
      <p>${date}</p>`
  );
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId(),
  });

  person.save().then(person => {
    response.json(person);
  });
});

app.put("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = request.body
  persons = persons.filter((p) => p.id !== id).concat(person)

  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
