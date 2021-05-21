require("dotenv").config();
const express = require("express");
const app = express();
var morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

app.use(express.static("build"));
app.use(express.json());
app.use(cors());
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const generateId = () => Math.floor(Math.random() * 10000);


app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  const date = new Date();
  Person.find({}).then(persons => {
    response.send(
      `<p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>`
    );
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId(),
  });

  person.save()
    .then(savedPerson => {
      return savedPerson.toJSON();
    })
    .then(formattedPerson => {
      response.json(formattedPerson);
    })
    .catch(error => {
      return response.status(400).json({
        error: error.message,
      });
    });
});

app.put("/api/persons/:id", (request, response) => {
  const body = request.body;

  Person.findByIdAndUpdate(request.params.id, { number: body.number }, { new: true, runValidators: true })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      return response.status(400).json({
        error: error.message,
      });
    });
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => {
      return response.status(400).json({
        error: error.message,
      });
    });
});


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "MongoError") {
    return response.status(400).json({
      error: error.message
    });
  };
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
