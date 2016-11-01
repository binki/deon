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
    'title' : "ADE 2016",
    'location' : "De Balie",
    'city': "Amsterdam, NE", 
    'date' : "2016-11-20T20:30:00",
    'monstercat': true
  })
  obj.events.push({
    'title' : "Karma Fields Live The Hex",
    'location' : "LOT 613",
    'city': "Los Angeles. USA", 
    'date' : "2016-11-04T20:30:00",
    'monstercat': false
  })
  obj.events.push({
    'title' : "FVDED 2016 Pre-Party",
    'location' : "Celebrities",
    'city': "Vancouver, CA", 
    'date' : "2016-11-30T20:30:00",
    'monstercat': true
  })
  obj.events.push({
    'title' : "AFK DreamHack 2016",
    'location' : "Empire Control room",
    'city': "Austin, USA", 
    'date' : "2016-12-05T20:30:00",
    'monstercat': true
  })
  obj.events.push({
    'title' : "Seasons 2016",
    'location' : "Empire Control room",
    'city': "Austin, USA", 
    'date' : "2016-05-05T20:30:00",
    'monstercat': true
  })
}

