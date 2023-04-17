import React from "react";
import "./TrendingCoins.css";

const TrendingCoins = ({
  name,
  image,
  symbol,
  price,
  volume,
  priceChange,
  marketCap,
}) => {
  return (
    <div className="trending-coin-container">
      <div className="trending-coin-row">
        <div className="trending-coin">
          <img src={image} alt="crypto" />
          <h1>{name}</h1>
          <p className="trending-coin-symbol">{symbol}</p>
        </div>
        <div className="trending-coin-data">
          <p className="trending-coin-price">${price}</p>
          {priceChange < 0 ? (
            <p className="trending-coin-percent red">
              {priceChange.toFixed(2)}%
            </p>
          ) : (
            <p className="trending-coin-percent green">
              {priceChange.toFixed(2)}%
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingCoins;
