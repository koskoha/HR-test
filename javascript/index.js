$(document).ready(function () {
  $("#contactForm").on("submit", function(event) {
    // everything looks good!
    event.preventDefault();
    submitForm();
  });

  function submitForm() {
    var address = $("#address").val();
    var name = $("#name").val();
    var url = "test.html?name=" + encodeURIComponent(name) + "&address=" + encodeURIComponent(address)
    window.location.href = url;
  }

});