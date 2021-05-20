export const formatDateAndTime = (dateTxt) => {
    const tempArr = dateTxt?.split(" ");
    return {
        date: tempArr?.[0].split("-").reverse().join("/"),
        time: tempArr?.[1]
    }
}