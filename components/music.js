export { stationTags, loadStations, Genre }

async function loadStations() {
    try {
        const res = await fetch("https://de1.api.radio-browser.info/json/stations/search?language=english&offset=0&hidebroken=true")
        const apiStations = await res.json()
        const filteredStations = apiStations.filter(station => {
            let isValid = true
            return isValid
        })
        const sortedStations = filteredStations.sort((a, b) => {
            return b.votes - a.votes
        })

        const mappedStations = sortedStations.map(station => {
            station.tags = station.tags ? station.tags.split(",") : []
            station.urlResolved = station.url_resolved
            return station
        })

        return mappedStations
    } catch (e) {
        console.log(e)
        return []
    }
}

class Genre {
    constructor({ title, tags, color }) {
        this.title = title
        this.tags = tags
        this.currentStation = 0
        this.stations = []
        this.color = color
        this.playing = false
    }
}

const years = [
    new Genre({ title: "1930's", tags: ['1930', '1930s'] }),
    new Genre({ title: "1940's", tags: ['1940', '1940s'] }),
    new Genre({ title: "1950's", tags: ['1950', '1950s'] }),
    new Genre({ title: "1960's", tags: ['1960', '1960s'] }),
    new Genre({ title: "1970's", tags: ['1970', '1970s'] }),
    new Genre({ title: "1980's", tags: ['1980', '1980s'] }),
    new Genre({ title: "1990's", tags: ['1990', '1990s'] }),
    new Genre({ title: "2000's", tags: ['2000', '2000s', '00s', "00's"] }),
    new Genre({ title: "2010's", tags: ['2010', '2010s'] }),
    new Genre({ title: "2020's", tags: ['2020', '2020s'] }),
]

const top = [
    new Genre({
        title: 'Top Hits',
        tags: ['top100', 'top40', 'top hits', 'top 40', 'top 100'],
    }),
]

const popular = [
    new Genre({
        title: 'Teen Pop',
        tags: ['teen pop', 'teen-pop', 'teenpop'],
    }),
    new Genre({
        title: 'Pop',
        tags: ['pop'],
    }),
    new Genre({
        title: 'KPop',
        tags: ['kpop', 'k-pop'],
    }),
    new Genre({
        title: 'JPop',
        tags: ['jpop', 'j-pop'],
    }),
]

const misc = [
    new Genre({
        title: 'LoFi',
        tags: ['lofi', 'lofidelity'],
    }),
    new Genre({
        title: 'Trance',
        tags: ['trance'],
    }),
    new Genre({
        title: 'Classical',
        tags: ['classical', 'piano'],
    }),
    new Genre({
        title: 'Jazz',
        tags: ['Jazz', 'jazz'],
    }),
    new Genre({
        title: 'Rock',
        tags: ['rock'],
    }),
    new Genre({
        title: 'Punk',
        tags: ['punk'],
    }),
]

const stationTags = [
    new Genre({
        title: 'All Stations',
        tags: ['all'],
    }),
    ...top, ...popular, ...misc, ...years]