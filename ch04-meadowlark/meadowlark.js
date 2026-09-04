const express = require("express");
const { engine: expressHandlebars } = require("express-handlebars");

//const fortune = require("./lib/fortune");
const handlers = require("./lib/handlers");

const app = express();

// configure Handlebars view engine
app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main",
  }),
);

app.set("view engine", "handlebars");

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", handlers.home);

app.get("/about", handlers.about);

// custom 404 page
app.use(handlers.notFound);

// custom 500 page
app.use(handlers.serverError);

if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Express запущен на http://localhost:${port}` +
        "; нажмите Ctrl+C для завершения.",
    );
  });
} else {
  module.exports = app;
}
