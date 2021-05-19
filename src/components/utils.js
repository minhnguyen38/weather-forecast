export const formatDateAndTime = (date) => {
    let formatDateAndTime = new Date(date);
    let dd = formatDateAndTime.getDate();
    let mm = formatDateAndTime.getMonth() + 1;
    let yyyy = formatDateAndTime.getFullYear();
    let hours = formatDateAndTime.getHours();
    let minutes = formatDateAndTime.getMinutes();
    let seconds = formatDateAndTime.getSeconds();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    let formatDate = dd + '/' + mm + '/' + yyyy;
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    let formatTime = hours + ':' + minutes + ':' + seconds;
    return {
        date: formatDate,
        time: formatTime
    }
}
