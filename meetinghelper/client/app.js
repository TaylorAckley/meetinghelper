Template.app.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $('#left').geocomplete().bind("geocode:result", function(event, result){
    console.log(result);
    var url = "https://maps.googleapis.com/maps/api/timezone/json?location=" + result.geometry.location.lat() + "," + result.geometry.location.lng() + "&timestamp=1331161200&key=AIzaSyDJ3tXovT-BRPhHpFZVfXcH-0nTzGUjadA";
    Meteor.http.get(url, function(error, result) {
      if(error) {
        return error;
      }
      else {
          console.log(result.data);
          var utcOffset = Number(result.data.rawOffset / 60 / 60);
          var tzObj = [utcOffset, result.data.timeZoneId, result.data.timeZoneName];
          console.log(tzObj);
          Session.set("leftTzObj", tzObj);
      }
    });
  });

  $('#right').geocomplete().bind("geocode:result", function(event, result){
console.log(result);
var url = "https://maps.googleapis.com/maps/api/timezone/json?location=" + result.geometry.location.lat() + "," + result.geometry.location.lng() + "&timestamp=1331161200&key=AIzaSyDJ3tXovT-BRPhHpFZVfXcH-0nTzGUjadA";
Meteor.http.get(url, function(error, result) {
  if(error) {
    return error;
  }
  else {
      console.log(result.data);
      var utcOffset = Number(result.data.rawOffset / 60 / 60);
      var tzObj = [utcOffset, result.data.timeZoneId, result.data.timeZoneName];
      console.log(tzObj);
      Session.set("rightTzObj", tzObj);
  }
});
});

    }
  });
});

Template.app.events({
  "click #execute": function() {
    var windowBeg = 8;
    console.log(windowBeg.d);
    var windowEnd = 17;
    console.log(windowEnd.d);
    var leftObj = Session.get("leftTzObj");
    var rightObj = Session.get("rightTzObj");
    var leftUTC = leftObj[0];
    var rightUTC = rightObj[0];
    console.log(leftUTC);
    console.log(rightUTC);
    var diff = leftUTC - rightUTC;
    $('#diff').html(diff);
    var difflit = (rightUTC - leftUTC) + 8;
      $('#difflit').html(difflit);
  }
});


Template.app.helpers({
  getLeftTzObj: function() {
    var leftTzObj = Session.get("leftTzObj");
    console.log("left");
    console.log(leftTzObj);
    return leftTzObj;
  },
  getRightTzObj: function() {
    var rightTzObj = Session.get("rightTzObj");
    console.log("right");
    console.log(rightTzObj);
    return rightTzObj;
  }
});
