function getCurrentItem(){
  var el = document.querySelector('[role=carousel]')
  var n = 0
  for (var i = 0; i<=el.children.length; i++){
    var item = el.children[i]
    if (item.classList.contains("active")) {
      n = i
      break
    }
  }
  return n
}

function isCarouselAnimating(){
  return document.querySelector('[role=carousel]').classList.contains('animating')
}

function nextItem() {
  var isAnimating = isCarouselAnimating()
  if (!isAnimating){
    var n = getCurrentItem()
    hideItem('to-left');
    showItem('from-right');
  }
}

function previousItem() {
  var isAnimating = isCarouselAnimating()
  if (!isAnimating){
    var n = getCurrentItem()
    hideItem('to-right');
    showItem('from-left');
  }
}

function hideItem(direction) {
  var el = document.querySelector('[role=carousel]')
  var items = el.children
  var dots = document.querySelector('[role=carousel-dots]').children
  var currentItem = getCurrentItem()

  el.classList.add('animating')
  items[currentItem].classList.add(direction)
  dots[currentItem].classList.remove('active')
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('active', direction)
  });
}

function showItem(direction) {
  var el = document.querySelector('[role=carousel]')
  var items = el.children
  var dots = document.querySelector('[role=carousel-dots]').children
  var currentItem = getCurrentItem()
  
  currentItem = direction == 'from-left' ? currentItem-1 : currentItem+1
  currentItem = (currentItem + items.length) % items.length

  items[currentItem].classList.add('next', direction)
  dots[currentItem].classList.add('active')
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('next', direction)
    this.classList.add('active')
    el.classList.remove('animating')
  });
}

function transformEvent (obj){
  obj = obj || {}
  obj.videoId = 'WuqpgpHH1r4'
  obj.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum nibh massa, quis sollicitudin metus dignissim sed. Suspendisse sollicitudin aliquam orci, egestas feugiat nisl rhoncus rhoncus. Etiam luctus arcu nisl, sed mollis nunc sagittis sit amet. Morbi ac mi venenatis, pulvinar sapien sed, condimentum nibh. Aenean vel ultricies sapien, nec tempor elit. Maecenas iaculis urna non aliquam tincidunt. Fusce lacinia imperdiet lorem eu vulputate. Donec nec aliquet libero, sed auctor est. Praesent ultrices metus ut nunc commodo, sit amet rutrum enim gravida. Nam interdum tincidunt mi id ullamcorper. Mauris rutrum mi commodo, consequat lacus eget, consectetur magna.'

  obj.carousel = []
  obj.gallery = []

  for (var i = 1; i<31; i++){
    var placeholder = '/img/event/DD'+i+'.jpg'
    if (i<4) obj.carousel.push(placeholder)
    else obj.gallery.push(placeholder)
  }

  obj.carousel = obj.carousel.map(function(value, currentIndex){
    preLoadImage(value)
    return {
      'index': currentIndex,
      'isFirst': currentIndex==0,
      'image': value
    }
  })
  obj.gallery = obj.gallery.map(function(value){
    return {
      'src': value.replace('event','event/thumb'),
      'bigSrc': value
    }
  })
  return obj
}

function openGalleryModal (e, el) {
  openModal('gallery-modal', {
    src: el.getAttribute('big-src')
  })
}

function transformEvents (obj) {
  mockAPIEvents(obj)
  obj.events.forEach(function (i, index, arr) {
    today = (new Date()).setHours(0,0,0,0)
    i.upcoming = new Date(i.date) > today
    i.dateString = formatDate(i.date)
    i.date = formatDateJSON(i.date)
    i.id = "123"
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
    'date' : "2016-11-15T20:30:00",
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

