var browseMusicLimit = 25

function transformBrowseMusic (obj) {
  obj = obj || {}
  var q    = queryStringToObject(window.location.search)
  q.limit  = (q.pages || 0) * browseMusicLimit
  q.skip   = 0
  obj.query = objectToQueryString(q)
  return obj
}

function mapFilterString (str) {
  return str.substr(0, str.lastIndexOf('s'))
}

function completedBrowseFilters () {
  var q = queryStringToObject(window.location.search)
  var cel = document.querySelector('[role="filters-list"]')
  if (!cel) return
  filterBrowseMusic.filters.forEach(function (filter) {
    var values = (q[filter] || '').split(',').map(mapStringTrim).filter(filterNil)
    values.forEach(function (value) {
      var el = createFilterItem(mapFilterString(filter), value)
      cel.appendChild(el)
    })
  })
}

function createFilterItem (type, value) {
  var div = document.createElement('div')
  var template = getTemplateEl('browse-filter-item')
  render(div, template.textContent, {
    type: type,
    value: value
  })
  return div.firstElementChild
}

function completedBrowseMusic () {
  var q = getBrowseMusicQuery()
  q.limit = browseMusicLimit * (parseInt(q.pages) || 1)
  q.skip = 0
  delete q.pages
  openBrowsePage(q)
}

function openBrowsePage (q) {
  var cel = document.querySelector('[role="browse-pages"]')
  if (!cel) return
  var tel = getTemplateEl('browse-page')
  var div = document.createElement('div')
  render(div, tel.textContent, {
    source: endpoint + '/catalog/browse/?' + objectToQueryString(q)
  })
  var ul = div.firstElementChild
  cel.appendChild(ul)
  loadSubSources(ul)
}

function transformMusicBrowseResults (obj, done) {
  var tracks = obj.results
  var playIndexOffset = obj.skip || 0
  getArtistsAtlas(tracks, function (err, atlas) {
    if (!atlas) atlas = {}
    var rmap = {}
    tracks.forEach(function (track, index, arr) {
      var release = track.release
      if (!rmap[release._id]) rmap[release._id] = track.release
      delete track.release
      release = rmap[release._id]
      if (!release.tracks) release.tracks = []
      release.tracks.push(track)
    })
    var releases = Object.keys(rmap).map(function (key) { return rmap[key] })
    releases.forEach(function(release) {
      mapRelease(release)
      release.tracks.forEach(function (track, index, arr) {
        mapReleaseTrack(track)
        track.index        = playIndexOffset
        track.releaseId    = release._id
        track.trackNumber  = getTrackNumber(track, release._id)
        track.playUrl      = getPlayUrl(track.albums, release._id)
        track.artists      = mapTrackArtists(track, atlas)
        track.downloadLink = getDownloadLink(release._id, track._id)
        track.genresList   = track.genres.filter(function (i) { return i !== track.genre }).join(", ")
        track.genreBonus   = track.genres.length > 1 ? ('+' + (track.genres.length - 1)) : ''
        track.genreLink    = encodeURIComponent(track.genre)
        playIndexOffset++
      })
      release.tracks.sort(sortTracks)
    })
    releases.sort(sortRelease)
    obj.results = releases
    obj.total = obj.total
    done(null, obj)
  })
}

function completedMusicBrowseResults () {
  player.set(buildTracks())
  var el = document.querySelector('[role="browse-more"]')
  if (!el) return
  el.disabled = false
}

function addBrowseFilter (e, el) {
  var cel = document.querySelector('[role="filters-list"]')
  var el = createFilterItem(el.name, el.value)
  cel.appendChild(el)
}

function removeBrowseFilter (e, el) {
  var li = el.parentElement
  li.parentElement.removeChild(li)
}

function getBrowseMusicQuery () {
  return queryStringToObject(window.location.search)
}

function filterBrowseMusic (e, el) {
  var q = getBrowseMusicQuery()
  var data = getTargetDataSet(el) || {}
  filterBrowseMusic.filters.forEach(function (key) {
    if (data[key] && data[key].length > 0) {
      q[key] = data[key]
    } else {
      delete q[key]
    }
  })
  delete q.pages
  go('/browse?' + objectToQueryString(q))
}
filterBrowseMusic.filters = [
  'tags',
  'genres',
  'types'
]

function browseMore (e, el) {
  var q = getBrowseMusicQuery()
  var pages = parseInt(q.pages) || 0
  q.limit = browseMusicLimit
  q.skip = pages * q.limit
  delete q.pages
  openBrowsePage(q)
  delete q.limit
  delete q.skip
  q.pages = pages + 1
  var url = window.location.origin + window.location.pathname + '?' + objectToQueryString(q)
  history.pushState({}, "", url)
}
