//根据金纬度计算距离
export function getDistance(nursingLocation: string, location: {
    latitude: number,
    longitude: number
}): string {
    if (location.latitude == 0 && location.longitude == 0) {
        return '加载中...'
    }

    let rad1 = parseFloat(nursingLocation.split(',')[0]) * Math.PI / 180.0
    let rad2 = location.latitude * Math.PI / 180.0
    let a = rad1 - rad2
    let b = parseFloat(nursingLocation.split(',')[1]) * Math.PI / 180.0 - location.longitude * Math.PI / 180.0

    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
    s = s * 6378.137
    s = Math.round(s * 10000) / 10000 // 米
    s = s / 10 // 公里
    let str = s.toString();
    str = str.substring(0, str.indexOf('.') + 2);
    return '距离您' + str + '公里'
}

// 时间戳转换
export function parseTime(time, cFormat) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string')) {
            if ((/^[0-9]+$/.test(time))) {
                // support "1548221490638"
                time = parseInt(time)
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(new RegExp(/-/gm), '/')
            }
        }

        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        return value.toString().padStart(2, '0')
    })
    return time_str
}