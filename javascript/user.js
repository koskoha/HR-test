$(document).ready(function () {
  var user = new Object;
  $(function () {
    if (user) {
      if (window.location.search.split('?').length > 1) {
        var params = window.location.search.split('?')[1].split('&');
        for (var i = 0; i < params.length; i++) {
          var key = params[i].split('=')[0];
          var value = decodeURIComponent(params[i].split('=')[1]);
          user[key] = value;
        }
      }
    }
    if (user.name && user.address) {
      console.log("query ", user);
    }
  });

});