const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const port = 3737;

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.post("/verify", (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  switch (email) {
    case "fail@army.com":
      console.log("fail", email);
      res.status(500).send({ message: "Bad request" });
      return;
    case "new@user.com":
      res.status(200).send({ message: "all good in the hood" });
      return;
    default:
      res.status(404).send({ message: "not a valid query" });
      return;
  }
});

server.use(router);
server.listen(port, () => {
  console.log(`test server running on ${port}`);
});
