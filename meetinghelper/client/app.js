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
    $('#error').html("");
    ga('send', 'event', 'Windows', 'execute');
    var leftObj = Session.get("leftTzObj");
    var rightObj = Session.get("rightTzObj");
    //var date = $("#meeting").val();
    var leftUTC = leftObj[0];
    var rightUTC = rightObj[0];
    if (leftObj && rightObj) {
    console.log(leftUTC);
    console.log(rightUTC);
    var diff = leftUTC - rightUTC;
    if (diff < 0) {
      diff = Math.abs(diff);
      console.log(diff);
      $('#diff').html(leftObj[2] + " is " + diff + " hours behind " + rightObj[2]);
    }
    else {
      $('#diff').html(leftObj[2] + " is " + diff + " hours ahead of " + rightObj[2]);
    }
    var difflit = (rightUTC - leftUTC) + 8;
    var diffsem = "";
// todo: refactor this to use += instead.  this is ugly... but works!
      if (difflit < 0) {
        difflit -= 8;
        difflit += 12;
        //difflit = Math.abs(difflit);
        diffsem =  difflit + "pm the previous day";
      }
      else if (difflit < 12) {  //TODO this could be refactored
        diffsem = difflit + "am";
      }
      else {
        diffsem =  difflit + "pm";
      }

      $('#difflit').html("When it is 8am in " + leftObj[2] + " then it is " + diffsem + " in " + rightObj[2]);
      $('#results').removeClass('hidden');
  }  // end if
  else {
    $('#error').html("Looks like you have a form value missing!");
  }
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
  },
  getDate: function() {
    return new Date();
  }
});
