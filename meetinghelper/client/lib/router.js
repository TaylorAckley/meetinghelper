
Router.configure({
    trackPageView: true
});

Router.plugin('seo', {
  defaults: {
    title: 'Meeting Helper',                 // Will apply to <title>, Twitter and OpenGraph.
    suffix: 'For People Who Hate Timzone Math',
    separator: '-',

    description: 'Meeting Helper allows you to pick two timezones and figure out the difference',        // Will apply to meta, Twitter and OpenGraph.
    image: 'http://lorempixel.com/200/200/',   // Will apply to Twitter and OpenGraph.

    meta: {
      keywords: ['meeting', 'helper', 'timezone', 'difference']
    },

    twitter: {
      card: 'Meeting',
      creator: '@taylorackley'
      // etc.
    },

    og: {
      site_name: 'Meeting Helper',
      image: 'http://lorempixel.com/200/200/'
      // etc.
    }
  }
});

Router.route('/',
function() {
  this.render('app');

}, {trackPageView: true});

/*
Router.route('/items', function () {
  this.render('Items');
});

Router.route('/items/:_id', function () {
  var item = Items.findOne({_id: this.params._id});
  this.render('ShowItem', {data: item});
});

Router.route('/files/:filename', function () {
  this.response.end('hi from the server\n');
}, {where: 'server'});
*/
