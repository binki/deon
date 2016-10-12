var supportThisReleaseButtonsTest = new SplitTest({
  getButtons: function () {
    var buttons = document.querySelectorAll('.modal--release ul li a')
    return buttons
  },
  name: 'support-this-release-buttons',
  modifiers: {
    'button': function () {
      //control
    },
    'button--cta': function (_this) {
      var buttons = _this.getButtons()
      for(var i = 0; i < buttons.length; i++) {
        buttons[i].classList.add('button--cta')
      }
    }
  },
  checkStart: function (test) {
    return document.querySelector('.modal--release') != null
  },
  postModifiers: function () {
    var buttons = this.getButtons()
    for(var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        this.convert()
      }.bind(this))
    }    
  }
})

var musicReleasesVsBrowseTest = new SplitTest({
  name: 'music-releases-vs-browse',
  getNavItem: function () {
    return document.querySelector('nav.mcat-nav a[role=goto-music]')
  },
  recordPlays: false,
  checkStart: function () {
    return sixPackSession != null
  },
  postModifiers: function () {
    this.getNavItem().addEventListener('click', function () {
      //If they click on the Music nav item we will count a conversion if they play music from there
      this.recordPlays = true
      splitTestConvertKpi('music-releases-vs-browse', 'music-clicked')
    }.bind(this))
    openRoute.completed.push(function () {
      //If they navigate away from the relevant pages then we don't record plays anymore, because they
      //aren't about plays after clicking Music
      var checkAgainst = window.location.pathname.substr(1)
      var goodUrls = []
      if(this.alt == 'releases') {
        goodUrls.push(/^(:?(\?.*)?$|music(\?.*)?)/) //the releases page
        goodUrls.push(/^release\/(.*)/) //a release page
      }
      else if(this.alt == 'browse') {
        goodUrls.push(/^release\/(.*)/) //a release page
        goodUrls.push(/^browse/)
      }

      var matched = false
      for(var i = 0; i < goodUrls.length; i++) {
        if(!checkAgainst.match(goodUrls[i])) {
          matched = true
        }
      }

      if(!matched) {
        this.recordPlays = false
      }
    }.bind(this))
  },
  modifiers: {
    'releases': function (_this) {
      _this.getNavItem().setAttribute('href', '/music')
    },
    'browse' : function (_this) {
      _this.getNavItem().setAttribute('href', '/browse')
    }
  }
})
