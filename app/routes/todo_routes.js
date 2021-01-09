module.exports = function(app, pool) {

	app.get('/', (req, res) => {
		res.send("Welcome to ToDo Application");
	});

	app.post('/create', async (req, res) => {
		try {
			const title = req.body.title;
			const description = req.body.description;
			const priority = req.body.priority;
			const state = req.body.state;
			let db = await pool.connect();
			const newTodo = await db.query("INSERT INTO todo (title, description, priority, state) values \
				($1, $2, $3, $4) RETURNING *", [title, description, priority, state]);
			db.release();
			res.status(200).json(newTodo.rows);	
		}
		catch(err) {
			console.error(err.message);
			res.status(500).send({errorMessage: "Internal server error. " + err.message});
		}
	});

	app.get('/getall', async (req, res) => {
		try {
			let db = await pool.connect();
			const toDos = await db.query("SELECT * FROM todo");
			db.release();
			res.status(200).json(toDos.rows);
		}
		catch(err) {
			console.error(err.message);
			res.status(500).send({errorMessage: "Internal server error. " + err.message});
		}
	});

	app.get('/get/:attribute/:value', async (req, res) => {
		try {
			let attribute = req.params.attribute;
			const value = req.params.value;
			if(attribute === "id" || attribute === "title" || attribute === "description" || 
				attribute === "date" || attribute === "priority" || attribute === "state") {
				if(attribute === "date") attribute = "input_date";
				let db = await pool.connect();
				const toDo = await db.query("SELECT * FROM todo WHERE "+attribute+" =$1", [value]);
				res.status(200).json(toDo.rows);
				db.release();
			}
			else {
				res.status(400).json("Wrong attribute passed");	
			}
		}
		catch(err) {
			console.error(err.message);
			res.status(500).send({errorMessage: "Internal server error. " + err.message});
		}
	});

	app.get('/get-sorted-on-high-priority', async (req, res) => {
		try {
			let db = await pool.connect();
			const toDoOnPriority = await db.query("SELECT * FROM todo ORDER BY priority, id");
			db.release();
			res.status(200).json(toDoOnPriority.rows);
		}
		catch(err) {
			console.error(err.message);
			res.status(500).send({errorMessage: "Internal server error. " + err.message});
		}
	});

	app.put('/updateall/:id', async (req, res) => {
		try {
			const { id } = req.params;
				
			const title = req.body.title;
			const description = req.body.description;
			const priority = req.body.priority;
			const state = req.body.state;
			let db = await pool.connect();
			await db.query("UPDATE todo SET title = $1, description = $2, \
				priority = $3, state = $4 where id=$5", [title, description, priority, state, id]);
			db.release();
			res.status(200).json("ToDo updated");
		}
		catch(err) {
			console.error(err.message);
			res.status(500).send({errorMessage: "Internal server error. " + err.message});
		}
	});

	app.put('/update/:id', async (req, res) => {
		try {
			// check for invalid attribute
			const { id } = req.params;
			let attribute = req.body.attribute;
			const value = req.body.value
			if(attribute === "title" || attribute === "description" || attribute === "date" ||
				attribute === "priority" || attribute === "state") {
				if(attribute === "date") attribute = "input_date";
				let db = await pool.connect();
				await db.query("UPDATE todo SET "+attribute+" = $1 where id = $2", [value, id]);
				db.release();
				res.status(200).json("ToDo updated");
			}
			else {
				res.status(400).json("Wrong attribute passed");
			}
		}
		catch(err) {
			console.error(err.message);
			res.status(500).send({errorMessage: "Internal server error. " + err.message});
		}
	});

	app.delete('/delete/:id', async (req, res) => {
		try{
			const { id } = req.params;
			let db = await pool.connect();
			await db.query("DELETE FROM todo WHERE id=$1", [id]);
			db.release();
			res.status(200).json("ToDo was removed sucessfully");	
		}
		catch(err) {
			console.error(err.message);
			res.status(500).send({errorMessage: "Internal server error. " + err.message});
		}
	});
}