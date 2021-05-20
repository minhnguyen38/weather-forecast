import React, { useState, useEffect } from 'react'
import '../styles/weather-icons.min.css'
import cityData from '../city.list.json'
import { AutoComplete, Input, Card } from 'antd';
import '../styles/main.css'
import DailyWeatherInfo from './DailyWeatherInfo';


const API_KEY = "b698fec24d6c0aa8b3cfc9a1eb99ab7d"

const Weather = () => {
    const [cityId, setCityId] = useState(null);
    const [options, setOptions] = useState([]);
    const [weatherDetailData, setWeatherDetailData] = useState(null)
    const [weatherCurrentData, setWeatherCurrentData] = useState(null)
    const [showCurrentItem, setShowCurrentItem] = useState(false)


    const callCurrentWeatherAPI = cityName => {
        setShowCurrentItem(false)
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=vi`)
            .then(response => response.json())
            .then(data => {
                setWeatherCurrentData(data)
                setShowCurrentItem(true)
            })
    }
    const callWeatherDetailAPI = cityName => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric&lang=vi`)
            .then(response => response.json())
            .then(data => setWeatherDetailData(data))
    }

    const callCurrentWeatherLocationAPI = (latitude, longitude) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?&appid=${API_KEY}&units=metric&lang=vi&lat=${latitude}&lon=${longitude}`)
            .then(response => response.json())
            .then(data => {
                setWeatherCurrentData(data)
                setShowCurrentItem(true)
            })
    }

    const callForecastWeatherLocationAPI = (latitude, longitude) => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?&appid=${API_KEY}&units=metric&lang=vi&lat=${latitude}&lon=${longitude}`)
            .then(response => response.json())
            .then(data => setWeatherDetailData(data))
    }

    useEffect(() => {
        const geoLocation = window.navigator.geolocation;
        if (geoLocation) {
            geoLocation.getCurrentPosition(pos => {
                const lat = pos.coords.latitude
                const lon = pos.coords.longitude;
                callCurrentWeatherLocationAPI(lat, lon)
                callForecastWeatherLocationAPI(lat, lon)
            });
        }
    }, [])


    const onSearch = (searchText) => {
        setOptions(
            !searchText
                ? []
                : cityData.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
                    .map(item => ({ value: item.name }))
        );
    };

    const onSelect = name => {
        setCityId(cityData.find(item => item.name === name)?.id)
        callCurrentWeatherAPI(name)
        callWeatherDetailAPI(name)

    };

    const onKeyDown = ({ key, target }) => {
        if (key === "Enter") {
            const firstItem = cityData.filter(item => item.name.toLowerCase().includes(target.value.toLowerCase())).shift()
            if (firstItem) {
                onSelect(firstItem.name)
                setOptions([])

            }
        }
    }
    const weatherDescription = weatherCurrentData?.weather?.map(item => item)
    let currentWeatherIcon = weatherDescription?.[0]?.icon
    const dataWeatherForecast = weatherDetailData?.list
        ?.filter((item, idx) => idx % 8 === 0)
        .map((item, idx) =>
            <DailyWeatherInfo
                key={idx}
                item={item}
                list={weatherDetailData.list}
                style={{ maxWidth: "100%" }}
            />)
    return (
        <>
            <h1>Dự báo thời tiết</h1>
            <AutoComplete
                options={options}
                className="weather-search-input"
                onSelect={onSelect}
                onSearch={onSearch}
                onKeyDown={onKeyDown}
                placeholder="Nhập tên tỉnh thành..."
            >
                <Input.Search
                    size="large"
                    enterButton
                    onSearch={(value) => onKeyDown({ key: "Enter", target: { value } })}
                />
            </AutoComplete>
            {showCurrentItem && <div className="current-weather">
                <Card
                    title={weatherCurrentData?.name}
                    className="weather-card"
                >
                    <p className="current-temperature">{Math.ceil(weatherCurrentData?.main?.temp)}°C</p>
                    <img src={`http://openweathermap.org/img/wn/${currentWeatherIcon}@4x.png`} alt="" />
                    <p className="range-of-temperature">{Math.ceil(weatherCurrentData?.main?.temp_min)}°C / {Math.ceil(weatherCurrentData?.main?.temp_max)}°C</p>
                    <p className="current-weather-status">{weatherDescription?.[0]?.description}</p>
                </Card>
            </div>}
            <div className="five-days-weather">
                {dataWeatherForecast}
            </div>
        </>
    );
};

export default Weather