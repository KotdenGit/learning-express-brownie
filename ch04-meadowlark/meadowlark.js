const express = require("express");

const { engine: expressHandlebars } = require("express-handlebars");

const fortune = require("./lib/fortune");

const app = express();

// Настройка механизма представлений Handlebars.
app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main",
  }),
);

app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.render("home"));

/* const fortunes = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple.",
  "Победи свои страхи, или они победят тебя.",
  "Рекам нужны истоки.",
  "Не бойся неведомого.",
  "Тебя ждет приятный сюрприз.",
  "Будь проще везде, где только можно.",
]; */

app.get("/about", (req, res) => {
  // const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render("about", { fortune: fortune.getFortune() });
});

// custom 404 page
app.use((req, res) => {
  res.status(404);
  res.render("404");
});

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.render("500");
});

app.listen(port, () =>
  console.log(
    `Express started on http://localhost:${port}; ` +
      `press Ctrl-C to terminate.`,
  ),
);
