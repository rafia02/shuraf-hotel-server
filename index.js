const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')

app.use(cors())
app.use(express.json())






const { MongoClient, ServerApiVersion } = require('mongodb');


async function run() {
  try {
    const uri = "mongodb+srv://rafia:Ym2WLtiVKtuJb3Mz@cluster0.uidcysm.mongodb.net/?retryWrites=true&w=majority";

   

    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
      

    const countryCollection = client.db('hotalBooking').collection('countries')
    const resortCollection = client.db('hotalBooking').collection('resorts')



    app.get('/countries', async(req, res)=>{
        const result = await countryCollection.find({}).toArray()
        res.send(result)
    })

    app.get('/resorts/:id', async(req, res)=>{
      const id = req.params.id 
      console.log(id)
      const filter = {country: id}
      const result = await resortCollection.find(filter).toArray()
      res.send(result)
    })

    
  } finally {


  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})