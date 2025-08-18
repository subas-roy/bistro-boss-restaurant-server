const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Bisro Boss Restawrant API services!')
})

app.listen(port, () => {
  console.log(`Bisro Boss Restawrant is running on port ${port}`)
})