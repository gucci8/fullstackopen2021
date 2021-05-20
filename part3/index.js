const express = require("express");
const app = express();
var morgan = require("morgan");
const cors = require("cors");

morgan.token("body", (req) => JSON.stringify(req.body));

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(cors());

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
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
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

  if (persons.map((p) => p.name).includes(body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  if (persons.map((p) => p.number).includes(body.number)) {
    return response.status(400).json({
      error: "number must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
