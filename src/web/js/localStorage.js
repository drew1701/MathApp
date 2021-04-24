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
        $(".dialog").hide()
        indexPageSignIn()
    }else{
        if(users!=null && users.length>1){
            $(".layer").removeClass("hide")
        }
        
    }
    
    console.log(users)
        if(users!=null){
            if(users.length==1){
                $(".dialog").hide()
                curr_user=users[0].user
                curr_avatar=users[0].avatar
                indexPageSignIn()
            }
            
            $("#first_login").hide()
            $(".index_page").show()
            for (let i in users){
                
                $(".dialog").append(`<div id=${users[i].user}_${users[i].avatar} style=background-image:url(../web/images/${users[i].avatar}.svg)>${users[i].user} </div>`)
            }
            
            $(".dialog").append("<div id=new>new?</div>")
            
            $(".dialog div").click(function(event){
                $(".layer").addClass("hide")
                $(".index_page").show()
                
                let selected=event.target.id
                console.log(selected)
                $(".dialog").fadeOut()
                if(selected=="new"){
                    window.location.assign("login.html")
                }else{
                    curr_user=selected.split("_")[0]
                    curr_avatar=selected.split("_")[1]
                    console.log(curr_user,curr_avatar)
                    indexPageSignIn()
                }
            })
        }else{
            $("#first_login").show()
            $(".index_page").hide()
            
        }

    
    $("#change_user").click(function(){
        $(".dialog").show()
        $(".layer").removeClass("hide")
        
    })
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
    $('#welcome').text("Welcome back, "+curr_user).css("font-size","2em")
    $(".avatar img").attr("src","../web/images/"+curr_avatar+".svg")
    $("#curr_user").text("hello, "+curr_user)
    sessionStorage.setItem("curr_user",curr_user)
    sessionStorage.setItem("curr_avatar",curr_avatar)
}