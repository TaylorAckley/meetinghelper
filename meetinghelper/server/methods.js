Meteor.methods({

getUtc: function() {
var url = "https://maps.googleapis.com/maps/api/timezone/json?location=39.6034810,-119.6822510&timestamp=1331161200&key=AIzaSyDJ3tXovT-BRPhHpFZVfXcH-0nTzGUjadA";
return Meteor.http.get(url);

}

});
