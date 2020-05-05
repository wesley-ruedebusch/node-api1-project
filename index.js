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

  server.post("/api/users", (req, res) => {
    const user = req.body;
    if (user.name === "" || user.bio === "") {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    } else {
      users.push(user);
      res.status(201).json(user);
    }
    if (!user) {
      res.status(500).json({
        errorMessage: "There was an error while saving the user to the database",
      });
    }
  });

  server.delete('/api/users/:id', (req, res) => {
    const delId = req.params.id;
    let user = users.filter(user => {
        return user.id == delId;
    })[0];
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.status(500).json({
        errorMessage: "The user with the specified ID does not exist."});
});


server.put("/api/users/:id", (req, res) => {
	const userUpdate = req.body;
	const id = req.params.id;

	if (!userUpdate.name || !userUpdate.bio) {
		res.status(400).json({
         errorMessage: "Please provide name and bio for the user." });
	} else {
		const user = users.find((user) => user.id == id);
		if (user) {
			users = users.map((user) => {
				return user.id == id ? { ...userUpdate, id } : user;
			});
			const updateUser = users.find((user) => user.id == id);
			if (updateUser) {
                res.json(users);
            } else {
                res.status(500).json({
                 errorMessage: "The information could not be modified." });
            }	 
		} else {
			res.status(404).json({
             errormessage: "The user with the specified ID does not exist." });
		}
	}
});

  const port = 5000;
  server.listen(port, () =>
    console.log(`api running on port ${port}`)
  ); // port crashed. Had to delete and restart and rewrite