import connectDB from './src/config/db.js'
import app from './src/app.js'

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
})
