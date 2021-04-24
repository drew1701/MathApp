$(document).ready(function() {
    username=sessionStorage.getItem("curr_user")
    if(username==null)username="Guest"
    $("#curr_user").text("hello, "+username)
})

