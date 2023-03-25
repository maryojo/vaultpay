const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04995dd78a979a6aa8cfdfa71dbb03a06e56d2a3c564630faea48e47ecdcd69b63c4702ab6f3635228448b7e5bfad5c0aa0b70b54bff1a2bac8ec05888fad9f55e": 100,
  "0498d2eef194fc52594283d8999926e181fe09a9a4b6b9ddd0383989c9a8a51e1bc3e624231090aee69d5a67089666ac1083277aa4c59e7403e9b6f4fe6d74d9d8": 50,
  "04050f49e475a5b70a491b18fe6f9f8896e4acd0b5419b61e93f6a0e63ceee8596a47f444c70b85908313fa711134720f0e6fc91966ba2429cb886b93e677ce216": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  //TODO get a signature from the client side application
  // Recover the public address from the signature

  //the signature would be the sender address bcos of security

  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
