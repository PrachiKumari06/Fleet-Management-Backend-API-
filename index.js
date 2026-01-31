import express from 'express'
import dotenv from "dotenv"
dotenv.config()
import userSignup from './routes/user.routes.js'
import vehicleRoutes from './routes/vehicle.routes.js'
import tripRoutes from './routes/customer.routes.js'
import analyticsRoutes from './routes/analytics.routes.js'
import logger from './middleware/logger.middleware.js'

const app = express()
const port = process.env.PORT || 3000
app.use(express.json());
app.use(logger);

app.use('/user', userSignup);
app.use('/vehicle', vehicleRoutes);
app.use("trips",tripRoutes);
app.use("/analytics",analyticsRoutes);
app.listen(port, () => console.log(`app listening on port ${port}!`))