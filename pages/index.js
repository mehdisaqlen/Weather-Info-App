import React, { useState, useRef } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import {
  WiDayCloudyWindy,
  WiCelsius,
  WiWindy,
  WiDayLightning,
  WiHumidity,
  WiSunset,
  WiSunrise,
} from "react-icons/wi";

import { BsArrowClockwise } from "react-icons/bs";
function index() {
  const [location, setLocation] = useState("pakistan");
  const [data, setData] = useState("");
  const [bgColor, setBgColor] = useState("black");

  const getData = () => {
    if (location == "") {
      alert("Please Enter a city");
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=28eb86f938988784c8a91d3179d4c44f`
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      })
      .catch((err) => {
        console.log("Got an Error");
      });
  };
  console.log("hello");
  console.log(data);

  return (
    <main className={styles.container}>
      <Head>
        <title>Weather App</title>
      </Head>

      <div className={styles.inputController}>
        <input
          type="text"
          name="city"
          placeholder="Enter a city name"
          className={styles.input}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={getData}>
          <BsArrowClockwise />
        </button>
      </div>

      <div className={styles.box}>
        <div className={styles.body}>
          <div className={styles.centerWrapper}>
            <WiDayLightning size="250" />
            <p className={styles.city}>
              {data && data.name}, {data && data.sys.country}
            </p>
            <h1>
              {data && Math.round(((data.main.temp - 32) * 5) / 9)}
              <WiCelsius />
            </h1>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.description} title="Condition">
              <WiDayCloudyWindy size="30" />{" "}
              <p>{data && data.weather[0].main}</p>
            </div>

            <div className={styles.description} title="Wind speed">
              <WiWindy size="30" /> <p>{data && data.wind.speed} k/h</p>
            </div>
            <div className={styles.description} title="Humidity">
              <WiHumidity size="30" /> <p>{data && data.main.humidity}%</p>
            </div>
            <div className={styles.description} title="Sun set">
              <WiSunset size="30" />{" "}
              <p>{data && Math.round(((data.main.temp_min - 32) * 5) / 9)}</p>
            </div>
            <div className={styles.description} title="Sunrise">
              <WiSunrise size="30" />{" "}
              <p>{data && Math.round(((data.main.temp_max - 32) * 5) / 9)}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default index;
