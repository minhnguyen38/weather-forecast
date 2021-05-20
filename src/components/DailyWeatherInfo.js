import { Row, Col } from 'antd';
import HoursWeatherInfo from './HoursWeatherInfo';
import { formatDateAndTime } from './utils';
import { useState } from 'react'

const DailyWeatherInfo = ({ item, list }) => {
    const [showHoursItem, setShowHoursItem] = useState(false)

    let dailyWeatherDescription = item?.weather.map(weather => weather)
    let dailyWeatherIcon = dailyWeatherDescription?.[0].icon
    const { date } = formatDateAndTime(item.dt_txt)
    const filterItems = list.filter(element => formatDateAndTime(element.dt_txt).date === date)
    const averageTemp = filterItems.reduce((acc, curr) => acc + curr.main.temp/filterItems.length, 0)
    const childItems = filterItems.map((child, idx) => {
        const { time } = formatDateAndTime(child.dt_txt)
        
        return (
            <Col span={24} lg={20} key={`hoursTable${child.dt}`}>

                <HoursWeatherInfo
                    style={{ backgroundColor: "#D5D7D0" }}
                    date={time}
                    iconName={child?.weather?.[0].icon}
                    temp={child.main.temp}
                    tempMin={child.main.temp_min}
                    tempMax={child.main.temp_max}
                    description={child?.weather?.[0]?.description}
                />
            </Col>
        )
    })
    return (
        <div style={{ marginBottom: "10px" }}>
            <Row gutter={[24, 24]} justify="center">
                <Col span={24} lg={20} className="daily-weather">
                    <HoursWeatherInfo
                        style={{cursor: "pointer", color: "white"}}
                        date={date}
                        iconName={dailyWeatherIcon}
                        temp={averageTemp}
                        tempMin={item.main.temp_min}
                        tempMax={item.main.temp_max}
                        description={dailyWeatherDescription?.[0]?.description}
                        onClick={() => setShowHoursItem(prevValue => !prevValue)}
                    />
                </Col>
                {showHoursItem && childItems}
            </Row>
        </div>
    )
}

export default DailyWeatherInfo