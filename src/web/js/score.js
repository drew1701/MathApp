$(document).ready(function(){
    var bestScore=''
    var averageScore=""
    var completedQuiz=''
    var completedAdd=''
    var completedSub=''
    var completedMul=''
    var completedDiv=''
//retrive data and update localstorage and sessionstorage
    var kid=JSON.parse(localStorage.getItem("kid"))
    var curr_user=sessionStorage.getItem("curr_user")
    var curr_avatar=sessionStorage.getItem("curr_avatar")
    console.log(kid,curr_user,curr_avatar)
    update_score()
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
            $("#score_img").attr("src",`../web/images/${curr_avatar}.svg`)
            
        $(".avatar img").attr("src",'../web/images/'+curr_avatar+'.svg')
        $("#curr_user").text("hello, "+curr_user)
        sessionStorage.setItem("curr_user",curr_user)
        sessionStorage.setItem("curr_avatar",curr_avatar)
        }
        update_score()
    })
// function to update profile data, get invoked every time switch user
    function update_score(){
        for(let i in kid){
            console.log(curr_user,curr_user.length,kid[i].user,kid[i].user.length)
            if(kid[i].user==curr_user.trim() && kid[i].avatar==curr_avatar){
                console.log("inside if")
                bestScore=kid[i].bestScore
                averageScore=kid[i].averageScore
                console.log(averageScore)
                completedQuiz=kid[i].completedQuiz
                completedAdd=kid[i].addQuestion
                completedSub=kid[i].subQuestion
                completedMul=kid[i].mulQuestion
                completedDiv=kid[i].divQuestion
                break;
            }
            
        }
        if(curr_avatar!=null){
            $("#score_img").attr("src",`../web/images/${curr_avatar}.svg`)
        }
        $("#score_name").text(curr_user==null?'':curr_user)
        $("#best_score").text(bestScore)
        $("#average_score").text(averageScore)
        $("#completed_quiz").text(completedQuiz)
        $("#completed_add").text(completedAdd)
        $("#completed_sub").text(completedSub)
        $("#completed_mul").text(completedMul)
        $("#completed_div").text(completedDiv)
    }
    


})
