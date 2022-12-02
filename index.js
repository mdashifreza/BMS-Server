const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8087;
const path = require("path");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const TicketBooking = require("./routes/TicketBooking");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
app.use(cors());
app.get('/',(req,res)=>{
  res.send("hey server is running succesfully:-");
})
app.use("/api/booking", TicketBooking);
app.use("/users", userRouter);
app.use(express.json());
//server
app.listen(PORT, () =>
  console.log(
    `BookMyShow App backend listening on port http://localhost:${PORT}`
  )
);
module.exports = app;
