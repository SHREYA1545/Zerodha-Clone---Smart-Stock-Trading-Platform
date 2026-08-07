const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoute = require("./routes/AuthRoute");
const { requireAuth } = require("./middlewares/AuthMiddleware");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const { MONGO_URL, PORT } = process.env;

const app = express();

const allowedOrigins = [
  "http://localhost:3000", 
  "http://localhost:3001",
  process.env.FRONTEND_URL,
  process.env.DASHBOARD_URL
].filter(Boolean); // removes undefined

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// ── Auth routes (signup, login, verify) ───────────────────────────
app.use("/", authRoute);

// ── GET holdings — sirf is user ki ───────────────────────────────
app.get("/allHoldings", requireAuth, async (req, res) => {
  try {
    // ✅ req.userId se sirf us user ki holdings
    let allHoldings = await HoldingsModel.find({ userId: req.userId });
    res.json(allHoldings);
  } catch (error) {
    res.status(500).send("Error fetching holdings");
  }
});

// ── GET positions — sirf is user ki ──────────────────────────────
app.get("/allPositions", requireAuth, async (req, res) => {
  try {
    let allPositions = await PositionsModel.find({ userId: req.userId });
    res.json(allPositions);
  } catch (error) {
    res.status(500).send("Error fetching positions");
  }
});

// ── GET orders — sirf is user ke ─────────────────────────────────
app.get("/allOrders", requireAuth, async (req, res) => {
  try {
    let allOrders = await OrdersModel.find({ userId: req.userId });
    res.json(allOrders);
  } catch (error) {
    res.status(500).send("Error fetching orders");
  }
});

// ── POST new order ────────────────────────────────────────────────
app.post("/newOrder", requireAuth, async (req, res) => {
  const { name, qty, price, mode } = req.body;
  const userId = req.userId; // ✅ token se userId

  try {
    // Order save karo with userId
    let newOrder = new OrdersModel({ userId, name, qty, price, mode });
    await newOrder.save();

    // ── BUY flow ──────────────────────────────────────────
    if (mode === "BUY") {
      // Sirf is USER ki holding check karo
      let existingHolding = await HoldingsModel.findOne({ userId, name });

      if (existingHolding) {
        let newQty = existingHolding.qty + Number(qty);
        let newAvg = (existingHolding.avg * existingHolding.qty + price * qty) / newQty;
        await HoldingsModel.findOneAndUpdate(
          { userId, name },
          { qty: newQty, avg: parseFloat(newAvg.toFixed(2)), price }
        );
        return res.send(`Bought more ${name}. Holdings updated!`);
      } else {
        let newHolding = new HoldingsModel({
          userId, // ✅ owner set karo
          name,
          qty: Number(qty),
          avg: Number(price),
          price: Number(price),
          net: "0.00%",
          day: "0.00%",
          isLoss: false,
        });
        await newHolding.save();
        return res.send(`${name} added to your Holdings!`);
      }
    }

    // ── SELL flow ─────────────────────────────────────────
    if (mode === "SELL") {
      // Sirf is USER ki holding check karo
      let existingHolding = await HoldingsModel.findOne({ userId, name });

      if (existingHolding) {
        if (Number(qty) > existingHolding.qty) {
          return res.status(400).send(`You only have ${existingHolding.qty} shares!`);
        }

        let newQty = existingHolding.qty - Number(qty);
        let profitLoss = (price - existingHolding.avg) * qty;
        let plMsg = profitLoss >= 0
          ? `Profit: ₹${profitLoss.toFixed(2)}`
          : `Loss: ₹${Math.abs(profitLoss).toFixed(2)}`;

        if (newQty === 0) {
          await HoldingsModel.findOneAndDelete({ userId, name });
        } else {
          await HoldingsModel.findOneAndUpdate({ userId, name }, { qty: newQty });
        }
        return res.send(`Sold ${qty} shares of ${name}. ${plMsg}`);

      } else {
        // Short sell — Positions mein daalo
        let existingPosition = await PositionsModel.findOne({ userId, name });
        if (existingPosition) {
          await PositionsModel.findOneAndUpdate(
            { userId, name },
            { qty: existingPosition.qty + Number(qty) }
          );
        } else {
          let newPosition = new PositionsModel({
            userId, // ✅ owner set karo
            product: "MIS",
            name,
            qty: Number(qty),
            avg: Number(price),
            price: Number(price),
            net: "0.00%",
            day: "0.00%",
            isLoss: true,
          });
          await newPosition.save();
        }
        return res.send(`Short sell placed for ${name}!`);
      }
    }
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

// ── Start server ──────────────────────────────────────────────────
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT || 3005, () => {
  console.log(`Server is listening on port ${PORT || 3005}`);
});