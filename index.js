const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
// middlewear
app.use(cors());
app.use(express.json());

// mongodb uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env
	.DB_PASS}@firstcluster.fhu8f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// connect to mongodb
async function run() {
	try {
		await client.connect();
		const database = client.db('codeaxes');
		const usersCollection = database.collection('users');
		// set user to db
		app.post('/user', async (req, res) => {
			const user = req.body;
			const result = await usersCollection.insertOne(user);
			res.json(result);
		});
		// get all user from db
		app.get('/users', async (req, res) => {
			const users = await usersCollection.find({}).toArray();
			res.json(users);
		});
		// delete an user
		app.delete('/user/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const result = await usersCollection.deleteOne(query);
			res.json(result);
		});
	} finally {
		// await client.close();
	}
}
run().catch(console.dir);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
