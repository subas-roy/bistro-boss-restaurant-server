const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mrd4l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect(); //  

    // Get the 'menu' collection from the 'bistrodb' database
    const menuCollection = client.db("bistrodb").collection("menu");

    // API endpoint to get all menu items
    app.get('/menu', async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close(); // Uncomment this line to close the MongoDB connection when done (not recommended for persistent servers)
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Welcome to Bisro Boss Restawrant API services!')
})

app.listen(port, () => {
  console.log(`Bisro Boss Restawrant is running on port ${port}`)
})