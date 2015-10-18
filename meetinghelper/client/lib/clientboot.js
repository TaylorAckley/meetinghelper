Meteor.startup(function() {
  GoogleMaps.load({
    key: 'AIzaSyDJ3tXovT-BRPhHpFZVfXcH-0nTzGUjadA',
    libraries: 'places'  // also accepts an array if you need more than one
  });
});
