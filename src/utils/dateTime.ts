module DateTimeUtil {

    export function now(format: string = 'yyyy-MM-dd hh:mm:ss') {
        let result = format
        let date = new Date()
        let year:string
        let month:string
        let day:string
        let hour:string
        let minute:string
        let second:string
        if (result.includes('yyyy')) {
            year = date.getFullYear() + ''
            result = result.replace("yyyy", year);
        }
        if (result.includes('MM')) {
            month = <string>(date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
            result = result.replace("MM", month);
        }
        if (result.includes('dd')) {
            day = <string>(date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
            result = result.replace("dd", day);
        }
        if (result.includes('hh')) {
            hour = <string>(date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
            result = result.replace("hh", hour);
        }
        if (result.includes('mm')) {
            minute = <string>(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
            result = result.replace("mm", minute);
        }
        if (result.includes('ss')) {
            second = <string>(date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
            result = result.replace("ss", second);
        }
        return result
    }
}

export default DateTimeUtil
