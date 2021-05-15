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
    if(sessionStorage.getItem("status")=="on"){
        update_score()
    }else{
        $("#change_user").text("Login")
        $("#mainB table").hide()
        $("#reminder").text("Login to track your score")
    }
    
    $("#change_user").click(function(){
        window.location.assign("login.html")
    })
    $("#logout").click(function(){
        sessionStorage.setItem("status","off")
        sessionStorage.removeItem("curr_user")
        sessionStorage.removeItem("curr_avatar")
        
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
            $("#score_img").attr("src",`./images/${curr_avatar}.png`)
        }
        $("#score_name").text(curr_user==null?'':"Congratulations, "+curr_user)
        $("#best_score").text(bestScore)
        $("#average_score").text(averageScore)
        $("#completed_quiz").text(completedQuiz)
        $("#completed_add").text(completedAdd)
        $("#completed_sub").text(completedSub)
        $("#completed_mul").text(completedMul)
        $("#completed_div").text(completedDiv)
    }
    


})
