const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient } = require('mongodb');
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
		console.log('Connected to MongoDB');
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
