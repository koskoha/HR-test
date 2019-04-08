$(document).ready(function () {
  $("#contactForm").on("submit", function(event) {
    // everything looks good!
    event.preventDefault();
    submitForm();
  });

  function submitForm() {
    var address = $("#address").val();
    var name = $("#name").val();
    var email = $("#email").val();
    var url = "test.html?name=" + encodeURIComponent(name) + "&address=" + encodeURIComponent(address) + "&email=" + encodeURIComponent(email)
    window.location.href = url;
  }

});