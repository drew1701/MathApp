var curr_user=''
var curr_avatar=''
var last_user=''
var users=''
$(document).ready(function(){
    // things happen when index page load
    curr_user=sessionStorage.getItem("curr_user")
    curr_avatar=sessionStorage.getItem("curr_avatar")
    last_user=localStorage.getItem("last_user")
    var users=JSON.parse(localStorage.getItem("kid"))
    console.log(users)
    if(sessionStorage.getItem("status")=="off"){
        $("#logout").hide()
    }
        if(users!=null){
            if(curr_user==null){
                if(sessionStorage.getItem("status")==null){
                    for(let i in users){
                        if(users[i].user==last_user){
                            curr_user=users[i].user
                            curr_avatar=users[i].avatar
                            console.log(curr_user,curr_avatar,last_user)
                            break;
                        }         
                    }
                    indexPageSignIn()
                }else if(sessionStorage.getItem("status")=="off"){
                    $("#first_login").text("Sign in")
                    
                }
                
            }else{
                indexPageSignIn()
            }
            
            console.log(curr_user,curr_avatar,last_user,sessionStorage.getItem("status"))
                
                if(users.length==1){
                    $("#first_login").hide()
                }else{
                    $("#first_login").show()     
                }
        }else{
            $("#first_login").text("Sign in")
            sessionStorage.setItem("status","off")
        }

    $("#first_login").click(function(){
        window.location.assign("login.html")
    })
    $("#discover_btn").click(function(){
        window.location.assign("select_game.html")
    })
    $("#logout").click(function(){
        sessionStorage.setItem("status","off")
        sessionStorage.removeItem("curr_user")
        sessionStorage.removeItem("curr_avatar")
        
    })

})
// function to update current user info on every page
function indexPageSignIn(){
    $("#first_login").hide()
    $('#welcome').text("Hello, "+curr_user).css("font-size","2em")
    $(".avatar img").attr("src","../web/images/"+curr_avatar+".png")
    $("#curr_user").text("Hello, "+curr_user)
    sessionStorage.setItem("status","on")
    sessionStorage.setItem("curr_user",curr_user)
    sessionStorage.setItem("curr_avatar",curr_avatar)
    localStorage.setItem("last_user",curr_user)
}