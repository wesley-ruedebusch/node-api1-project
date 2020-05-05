const express = require("express")

const server = express();

let users = [
    {
      id: 1,
      name: "Wesley Ruedebusch",
      bio: 'My computer is being amazing. Sarcasm.'
    },
  ];


server.use(express.json())


  
  server.get("/api/users", (req, res) => {
    users
      ? res.status(200).json(users)
      : res.status(500).json({
          errorMessage: "The users information could not be retrieved.",
        });
  });
  
  server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
  
    const user = users.find((e) => e.id == id);
  
    user
      ? res.json(user)
      : res
          .status(404)
          .json({ errormessage: "The user with the specified ID does not exist." });
  });

  const port = 5000;
  server.listen(port, () =>
    console.log(`api running on port ${port}`)
  ); // port crashed. Had to delete and restart and rewrite