
export const ICON_MAP = new Map()

addMapping([0, 1, "01d", "01n"], "day")
addMapping([2, "02d", "02n"], "cloudy-day-1")
addMapping([3, 45, 48, "04d", "03d", "03n", "04n", "50d", "50n"], "cloudy")
addMapping(
    [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, "10n", "10d", "11n", "11d", "09d", "09n"],
    "rainy-6"
)
addMapping([71, 73, 75, 77, 85, 86, "13d", "13n"], "snowy-5")
addMapping([95, 96, 99], "thunder")

function addMapping(values, icon) {
    values.forEach(value => {
        ICON_MAP.set(value, icon)
    })
}
