import {Row, Col} from 'antd';

const HoursWeatherInfo = ({date, iconName, temp, tempMin, tempMax, description, onClick, ...restProps}) => {
    const onRowClicked = () => {
        if (onClick) onClick()
    }

    return (
        <Row gutter={[16, 24]} justify="center" align="middle" onClick={onRowClicked} {...restProps}>
            <Col span={4}>
                <div>{date}</div>
            </Col>
            <Col span={5}>
                <img src={`http://openweathermap.org/img/wn/${iconName}@2x.png`} alt="" />
            </Col>
            <Col span={5}>
                <div>{Math.ceil(temp)}°C</div>
            </Col>
            <Col span={6}>
                <div>Thấp nhất: {Math.ceil(tempMin)}°C</div>
                <div>Cao nhất: {Math.ceil(tempMax)}°C</div>
            </Col>
            <Col span={4}>
                <div>{description}</div>
            </Col>
        </Row>
    )
}

export default HoursWeatherInfo