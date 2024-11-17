import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Sort from './components/Sort'
import Card from './components/Card'
import SeatChart from './components/SeatChart'

// ABIs
import tix from './abis/tix.json'

// Config
import config from './config.json'

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

function App() {
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)

  const [tiX, settix] = useState(null)
  const [occasions, setOccasions] = useState([
    {
      name: "ETH Bangkok",
      cost: tokens(3),
      tickets: 0,
      date: "16/11/2024",
      time: "6:00PM EST",
      location: "Bangkok, Thailand"
    },
    {
      name: "ETH Tokyo",
      cost: tokens(1),
      tickets: 100,
      date: "18/5/2024",
      time: "2:00PM JST",
      location: "Tokyo, Japan"
    },
    {
      name: "Circle Hackathon",
      cost: tokens(0.25),
      tickets: 100,
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
      tickets: 100,
      date: "16/11/2024",
      time: "8pm",
      location: "Axiata Areana, Malaysia"
    }
  ])

  const [occasion, setOccasion] = useState({})
  const [toggle, setToggle] = useState(false)

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()
    const tiX = new ethers.Contract(config[network.chainId].tix.address, tix, provider)
    settix(tiX)

    const totalOccasions = await tiX.totalOccasions()
    const occasions = []

    for (var i = 1; i <= totalOccasions; i++) {
      const occasion = await tiX.getOccasion(i)
      occasions.push(occasion)
    }

    setOccasions(occasions)

    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account)
    })
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <header>
        <Navigation account={account} setAccount={setAccount} />

        <h2 className="header__title"><strong>Event</strong> Tickets</h2>
      </header>

      <Sort />

      <div className='cards'>
        {occasions.map((occasion, index) => (
          <Card
            occasion={occasion}
            id={index + 1}
            tiX={tiX}
            provider={provider}
            account={account}
            toggle={toggle}
            setToggle={setToggle}
            setOccasion={setOccasion}
            key={index}
          />
        ))}
      </div>

      {toggle && (
        <SeatChart
          occasion={occasion}
          tiX={tiX}
          provider={provider}
          setToggle={setToggle}
        />
      )}
    </div>
  );
}

export default App;