var curr_avatar=""
var taken_avatar=''
var kid=""
var avatar_create=false
var avatars=[
    "avatar1",
    "avatar2",
    "avatar3",
    "avatar4",
    "avatar5",
    "avatar6",
    "avatar7",
    "avatar8",
    "avatar9",
    "avatar10",
    "avatar11",
    "avatar12",
    "avatar13",
    "avatar14",
    "avatar15",
    "avatar16",
    "avatar17",
    "avatar18",
    "avatar19"
]
$(document).ready(function(){
    $(".choose_avatar label").css("color","red")
    // display avaliable avatars when new player enter the name
    var users=JSON.parse(localStorage.getItem("kid"))
    if(users==null){
        $("#mainA").hide()
    }
    for (let i in users){
                
        $(".dialog").append(`<div id=${users[i].user}_${users[i].avatar} style=background-image:url(../web/images/${users[i].avatar}.png)>${users[i].user} </div>`)
    }    
    $(".dialog div").click(function(event){        
        let selected=event.target.id
        console.log(selected)
        window.location.assign("index.html")        
            curr_user=selected.split("_")[0]
            curr_avatar=selected.split("_")[1]
            // indexPageSignIn()
            sessionStorage.setItem("status","on")
        sessionStorage.setItem("curr_user",curr_user)
        sessionStorage.setItem("curr_avatar",curr_avatar)
        localStorage.setItem("last_user",curr_user)
            console.log(curr_user,curr_avatar,localStorage.getItem("last_user"))
        
    })

    $("#name").change(function(){
        $("#avatar_option img").remove()
        for(let i=0;i<avatars.length;i++){
            $("#avatar_option").append(`<img id=${avatars[i]}  src=./images/${avatars[i]}.png alt="avatar" width="80" height="80">`)
        }
        let n=$(this).val()
        console.log(n)
        kid=JSON.parse(localStorage.getItem('kid'))
        
        
        for(let i in kid){
            if(kid[i].user==n){
                taken_avatar=kid[i].avatar
                $(`#${taken_avatar}`).remove()
            }
        }
    $("#avatar_option img").click(function(event){
        $(".choose_avatar label").text("")
        avatar_create=true
        let curr_avatar=event.target.id
        $(`#${curr_avatar}`).css("border","2px solid black")
        var avatar_list=$("#avatar_option img")
        for(let i=0;i<avatar_list.length;i++){
            if(avatar_list[i].id!=curr_avatar){
                $(`#${avatar_list[i].id}`).css("border","none")
            }
        }
        console.log(curr_avatar)
        sessionStorage.setItem("curr_avatar",curr_avatar)      
    })  

    })
    

    // localstorage, seesionstorage, page user info will be updated once hit submit button
    $(".form_submit input").click(function(){
        if($("#name").val()==""){
            $(".choose_avatar label").text("put your name and pick your avatar")
        }else{
            if(!avatar_create){
                $(".choose_avatar label").text("pick your avatar").css("color","red")
            }else{
                var new_name=$("#name").val()
                curr_avatar=sessionStorage.getItem("curr_avatar")
                kid=JSON.parse(localStorage.getItem("kid"))==null?[]:JSON.parse(localStorage.getItem("kid"))
            let new_kid={'user':new_name,'avatar':curr_avatar,'bestScore':0,'averageScore':0,'completedQuiz':0,'addQuestion':0,'subQuestion':0,'mulQuestion':0,'divQuestion':0}
            kid.push(new_kid)
            console.log(kid)
            let img=$(`#${curr_avatar}`).attr("src")
            $(".avatar img").attr("src",img)
            localStorage.setItem("kid",JSON.stringify(kid))
            sessionStorage.setItem("curr_user",new_name)
            sessionStorage.setItem("status","on")
            localStorage.setItem("last_user",new_name)
            console.log("check")
            window.location.assign("index.html")  
            }
              
        }
        
    })
    $("#logout").click=function(){
        sessionStorage.setItem("status","off")
        sessionStorage.removeItem("curr_user")
        sessionStorage.removeItem("curr_avatar")
    }

})