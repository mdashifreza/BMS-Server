const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8090;
const path = require("path");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { connection } = require("./db/connector");
const TicketBooking = require("./routes/TicketBooking");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
app.use(cors());
//added code ashif
app.get('/',(req,res)=>{
  res.send("hey server is running succesfully");
})
//
app.use("/", TicketBooking);
app.use("/users", userRouter);
app.use(express.json());
app.listen(PORT, () =>
  console.log(
    `BookMyShow App backend listening on port http://localhost:${PORT}`
  )
);
module.exports = app;
