import mongoose  from "mongoose"

export  const dbConnection = ()=>{
    mongoose.connect(process.env.DB_ONLINE_URL)
        .then(_ => console.log('DB Connected'))
        .catch(err => console.log(err))
}