import relativeTime from "dayjs/plugin/relativeTime"
import dayjs from 'dayjs'
import zh from 'dayjs/locale/zh-cn'
dayjs.locale(zh)
dayjs.extend(relativeTime);