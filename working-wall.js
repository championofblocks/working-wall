Pictures = new Mongo.Collection("pictures");

if (Meteor.isClient) {
  Template.pictures.helpers({
    pictures: function () {
      return Pictures.find({}, {sort: {'date_added': -1}, limit: 30});
    }
  });

  Template.pictures.events({
  });

  Template.pictures.rendered = function() {
    var video = document.querySelector('video');
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var localMediaStream = null;

    function snapshot() {
      if (localMediaStream) {
        ctx.drawImage(video, 0, 0, 400, 150);
        Pictures.insert({url: canvas.toDataURL('image/png'), date_added: new Date});
        video.src = window.URL.createObjectURL(localMediaStream);
      }
    }

    video.addEventListener('click', snapshot, false);

    navigator.getUserMedia  = navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia;

    navigator.getUserMedia({video: true}, function(stream) {
      video.src = window.URL.createObjectURL(stream);
      localMediaStream = stream;
    }, function(){
      console.log("error getting image");
    });
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {});
}
