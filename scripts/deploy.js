const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  const [deployer] = await ethers.getSigners()
  const NAME = "tix"
  const SYMBOL = "tix"

  const tix = await ethers.getContractFactory("tix")
  const tiX = await tix.deploy(NAME, SYMBOL)
  await tiX.deployed()

  console.log(`Deployed TIX Contract at: ${tiX.address}\n`)

  // List 6 events
  const occasions = [
    {
      name: "ETH Bangkok",
      cost: tokens(3),
      tickets: 1,
      date: "16/11/2024",
      time: "6:00PM EST",
      location: "Bangkok, Thailand"
    },
    {
      name: "ETH Tokyo",
      cost: tokens(1),
      tickets: 12,
      date: "18/5/2024",
      time: "2:00PM JST",
      location: "Tokyo, Japan"
    },
    {
      name: "Circle Hackathon",
      cost: tokens(0.25),
      tickets: 12,
      date: "6/4/2024",
      time: "10:00AM TRT",
      location: "KL, Malaysia"
    },
    {
      name: "Travis Scott Utopia Tour",
      cost: tokens(5),
      tickets: 12,
      date: "16/11/2024",
      time: "6.00PM",
      location: "Bukit Jalil Stadium, Malaysia"
    },
    {
      name: "JJ Lin Concert",
      cost: tokens(1.5),
      tickets: 12,
      date: "16/11/2024",
      time: "8pm",
      location: "Axiata Areana, Malaysia"
    }
  ]

  for (var i = 0; i < 5; i++) {
    const transaction = await tiX.connect(deployer).list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location,
    )

    await transaction.wait()

    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});