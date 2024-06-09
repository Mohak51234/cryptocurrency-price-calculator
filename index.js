import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
  res.render("index.ejs");
})

app.post("/submit", async (req, res) => {
  try {
  const crypto1=req.body.crypto;
  const data1=await axios.get("https://api.blockchain.com/v3/exchange/tickers/"+crypto1+"-USD");
  res.render("index.ejs",{
    price:data1.data.price_24h,
    cryptoName:crypto1
  });
  }
  catch(err) {
    console.log(err);
    res.render("index", {
      price: "Error fetching price. Please try again."
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});