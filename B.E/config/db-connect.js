const mongoose = require('mongoose');

function connectToDB(){
  const url='mongodb+srv://AnasRZ:nRVbK8d7vJe6GmuJ@cluster0.xfpqaex.mongodb.net/'
  main().catch((err) => console.log(err))

  async function main() {
    mongoose.set('strictQuery', false)
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('DB connected')
  }
}
module.exports=connectToDB

