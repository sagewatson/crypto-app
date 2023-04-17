import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Coin from "./Coin";
import TrendingCoins from "./TrendingCoins";
import cryptoTracker from "./images/crypto-tracker.png";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTrendingCoins = coins.filter(
    (coin) => coin.price_change_percentage_24h >= 3
  );

  const sortedCoins = filteredTrendingCoins.sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  );

  const limitedCoins = sortedCoins.slice(0, 5);

  return (
    <div className="coin-app">
      <div className="trending-coins-container">
        <div className="nav-bar">
          <div className="logo">
            <img src={cryptoTracker} alt="crypto tracker logo" />
          </div>
        </div>
        <h2 className="trending-coins-title">Trending Coins</h2>
        {filteredTrendingCoins.length === 0 ? (
          <p className="no-trending-coins">No trending coins at the moment!</p>
        ) : (
          limitedCoins.map((coin) => {
            return (
              <>
                <TrendingCoins
                  key={coin.id}
                  name={coin.name}
                  image={coin.image}
                  symbol={coin.symbol}
                  volume={coin.total_volume}
                  price={coin.current_price}
                  priceChange={coin.price_change_percentage_24h}
                  marketCap={coin.market_cap}
                />
              </>
            );
          })
        )}
      </div>
      <div className="coin-search">
        <h2 className="coin-text">Search a currency</h2>
        <form>
          <input
            type="text"
            placeholder="Search"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>

      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.total_volume}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            marketCap={coin.market_cap}
          />
        );
      })}
    </div>
  );
}

export default App;
