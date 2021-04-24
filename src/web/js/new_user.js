var curr_avatar=""
var taken_avatar=''
var kid=""
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
    "avatar10"
]
$(document).ready(function(){
    // display avaliable avatars when new player enter the name
    $("#name").change(function(){
        $("#avatar_option img").remove()
        for(let i=0;i<avatars.length;i++){
            $("#avatar_option").append(`<img id=${avatars[i]}  src=./images/${avatars[i]}.svg alt="avatar" width="30" height="30">`)
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
        $("#avatar_option img").hover(function(){$(this).css("background-color","black")},function(){$(this).css("background-color","rgb(140, 97, 209)")})
    $("#avatar_option img").click(function(event){
        $("#selected_avatar").text("")
        let curr_avatar=event.target.id
        console.log(curr_avatar)
        sessionStorage.setItem("curr_avatar",curr_avatar)
        $("#selected_avatar img").remove()
        $("#selected_avatar").append(`<img id=${curr_avatar}  src=./images/${curr_avatar}.svg alt="avatar" width="30" height="30">`)
        
    })  

    })
    

    // localstorage, seesionstorage, page user info will be updated once hit submit button
    $(".form_submit input").click(function(){
        if($("form").valid()){
            if($("#selected_avatar img").length==0){
                $("#selected_avatar").text("pick your avatar")
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
            console.log("check")
            window.location.assign("index.html")  
            }
              
        }
        
    })

})