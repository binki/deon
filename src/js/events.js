function transformEvents (obj) {
  mockAPIEvents(obj)
  obj.events.forEach(function (i, index, arr) {
    today = (new Date()).setHours(0,0,0,0)
    i.upcoming = new Date(i.date) > today
    i.dateString = formatDate(i.date)
    i.date = formatDateJSON(i.date)
  })
  return obj  
}

function transformFeaturedEvent (obj) {
  transformEvents(obj)
  featured = obj.events[0]  
  featured.cover = featured.cover || "/img/events.jpg"  
  return featured
}

function transformUpcomingEvents (obj){
  transformEvents(obj)
  obj.events = obj.events.filter(function(el){
    return el.upcoming
  })
  return obj
}

function transformPastEvents (obj){
  transformEvents(obj)
  obj.events = obj.events.filter(function(el){
    return !el.upcoming
  })
  obj.events.map(function(el){
    el.cover = el.cover || "/img/events.jpg"  
  })
  return obj
}
function buyTickets(){
  alert("bought! seriously, check your credit card.")
}

function toggleUpcoming(){
  var el = document.querySelector('[role="upcoming-toggle"]')
  var table = document.querySelector('[role="upcoming-table"]')
  if (el.checked) table.classList.add('events--filtered')
  else table.classList.remove('events--filtered')
}

// TODO: Replace with real API
function mockAPIEvents(obj){
  obj = obj || {}
  obj.events = []
  obj.events.push({
    'title' : "New Year's 2017",
    'location' : "Placeholder",
    'city': "London, UK", 
    'date' : "2016-12-31T22:30:00",
    'monstercat': true
  })
  obj.events.push({
    'title' : "Christmas Party 2017",
    'location' : "Ice Bar",
    'city': "Alaska, USA", 
    'date' : "2016-12-24T22:30:00",
    'monstercat': true
  })
  obj.events.push({
    'title' : "Karma Fields Live | The Hex",
    'location' : "LOT 613",
    'city': "Los Angeles. USA", 
    'date' : "2016-11-04T20:30:00",
    'monstercat': false
  })

  obj.events.push({
    'title' : "ADE 2016",
    'location' : "De Balie",
    'city': "Amsterdam, NE", 
    'date' : "2016-10-20T22:00:00",
    'monstercat': true
  })
  obj.events.push({
    'title' : "Fvded 2016 Pre-Party",
    'location' : "Celebrities",
    'city': "Vancouver, CA", 
    'date' : "2016-06-30T22:00:00",
    'monstercat': true
  })
  obj.events.push({
    'title' : "AFK Launch DreamHack 2016",
    'location' : "Empire Control Room",
    'city': "Austin, USA", 
    'date' : "2016-05-05T20:00:00",
    'monstercat': true
  })
  obj.events.push({
    'title' : "Monstercat Showcase 2016",
    'location' : "Celebrities",
    'city': "Vancouver, CA", 
    'date' : "2016-03-24T21:00:00",
    'monstercat': true
  })
  obj.events.push({
    'title' : "Twitchcon 2015",
    'location' : "DNA Lounge",
    'city': "San Francisco, USA", 
    'date' : "2015-09-24T19:00:00",
    'monstercat': true
  })
  obj.events.push({
    'title' : "Digital Dreams 2015",
    'location' : "Tattoo",
    'city': "Toronto, CA", 
    'date' : "2015-06-27T22:00:00",
    'monstercat': true
  })
  obj.events.push({
    'title' : "Paradiso 2015",
    'location' : "Foundation",
    'city': "Seattle, USA", 
    'date' : "2015-06-24T21:00:00",
    'monstercat': true
  })
  obj.events.push({
    'title' : "SXSW 2015",
    'location' : "Empire Control Room",
    'city': "Austin, USA", 
    'date' : "2015-03-19T20:00:00",
    'monstercat': true
  })
}

