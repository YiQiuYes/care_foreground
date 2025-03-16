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