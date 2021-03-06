import {Row, Col} from 'antd';

const HoursWeatherInfo = ({date, iconName, temp, tempMin, tempMax, description, onClick, ...restProps}) => {
    const onRowClicked = () => {
        if (onClick) onClick()
    }

    return (
        <Row className="wrapper-hour-weather-row" gutter={8} justify="center" align="middle" onClick={onRowClicked} {...restProps}>
            <Col span={8} lg={4}>
                <div>{date}</div>
            </Col>
            <Col span={8} lg={5}>
                <img src={`http://openweathermap.org/img/wn/${iconName}@2x.png`} alt="" />
            </Col>
            <Col span={8} lg={5}>
                <div>{Math.ceil(temp)}°C</div>
            </Col>
            <Col span={12} lg={6}>
                <div>Thấp nhất: {Math.ceil(tempMin)}°C</div>
                <div>Cao nhất: {Math.ceil(tempMax)}°C</div>
            </Col>
            <Col span={12} lg={4}>
                <div>{description}</div>
            </Col>
        </Row>
    )
}

export default HoursWeatherInfo