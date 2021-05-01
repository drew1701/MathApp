var curr_user=''
var curr_avatar=''
var users=''
$(document).ready(function(){
    // things happen when index page load
    curr_user=sessionStorage.getItem("curr_user")
    curr_avatar=sessionStorage.getItem("curr_avatar")
    console.log(curr_user,curr_avatar)
    var users=JSON.parse(localStorage.getItem("kid"))
    if(curr_user!=null){
        indexPageSignIn()
    }
    
    console.log(users)
        if(users!=null){
            if(users.length==1){
                curr_user=users[0].user
                curr_avatar=users[0].avatar
                indexPageSignIn()
                $("#first_login").hide()
            }
            else{
                $("#first_login").show()            
            } 
        }else{
            $("#first_login").text("Sign in")
        }

    $("#first_login").click(function(){
        window.location.assign("login.html")
    })
    $("#discover_btn").click(function(){
        window.location.assign("select_game.html")
           
  })
})
// function to update current user info on every page
function indexPageSignIn(){
    $("#first_login").hide()
    $('#welcome').text("Hello, "+curr_user).css("font-size","2em")
    $(".avatar img").attr("src","../web/images/"+curr_avatar+".png")
    $("#curr_user").text("hello, "+curr_user)
    sessionStorage.setItem("curr_user",curr_user)
    sessionStorage.setItem("curr_avatar",curr_avatar)
}