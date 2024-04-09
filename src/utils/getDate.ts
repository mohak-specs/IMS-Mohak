import dayjs from "dayjs";

export const getDateWithoutTime = (date: string) => dayjs(date).format("DD MMM YYYY")

export const getDateWithTime = (date: string) => dayjs(date).format("DD MMM YYYY hh:mm A")