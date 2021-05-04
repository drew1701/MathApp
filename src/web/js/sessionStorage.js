$(document).ready(function() {
    username=sessionStorage.getItem("curr_user")
    if(username==null)username="Guest"
    $("#curr_user").text("Hello, "+username)

    if(sessionStorage.getItem("status")=="off"){
        $("#logout").hide()
    }

})

