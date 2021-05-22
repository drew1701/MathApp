var math=0
var quiz_num=-1
var option_border_color=''
var total_ques=0
var correct_ques=0
var correct_ans=0
var interval=0
var quiz=false
var practice_option={
    add: 1,
    sub: 2,
    mul: 3,
    div: 4,
}
var quiz_option={
    _10:10,
    _20:20,
    _30:30,
}
$(document).ready(function(){
    // chose practice mode

    $("#mainA div").html("<h1><b>How to start playing the game</b></h1><h2><b>Practice mode</b></h2><p>Contain four mathematical operation choices Select one which you want to practice with then press the Go button to start the game</p><h2><b>Quiz mode</b></h2><p>Contain an option of how many number of questions you want to take a quiz and each option has a mixed type of questions</p>")
    $(".select_operation,.select_amount,.game_page,.start_btn").hide()
    $("#practice_mode").click(function(){ 
        $("#mainA").html("<h1>Welcome to Practice Mode, select a subject and press GO</h1><img src=./images/operation.jpg alt=operation img>")
        $(this).hide()
        $("#quiz").remove()
        $(".c_infoBar,.select_amount,.start_btn,#c_hole,.c_option,#c_submit,#c_skip,.c_msg,.c_status,#b_msg").hide()
        $(".select_operation,.game_page").show()        
        $("#c_display").html("Press <button class=c_go>Go</button> to begin")
        $("#question span").text(quiz_num)

        $(".select_operation button").click(function(event) {
           
            
            for (let i in practice_option) {
                if(event.target.id==i){
                    math=practice_option[i]
                    $(`#${i}`).addClass("selected_bg")
                }else{
                    $(`#${i}`).removeClass("selected_bg")
                }
            }
                          
            console.log(math)
        })
        $('.c_go').click(function() {
            if(math!=0){
                var subject=""
            if(math==1){
                subject="Addition - A mathematical that finds the total number when two or more numbers are put together. "
            }else if(math==2){
                subject="Subtraction - A mathematical operation that tells us the difference between two numbers."
            }else if(math==3){
                subject="Multiplication - A mathematical operation that take one number and add it together a number of times."
            }else{
                subject="Division - A mathematical operation that break a number up into an equal number of parts"
            }
            $("#mainA").html(`<p>Math topic:<br>${subject}<br><br>How to play:<br>Click on the correct answer from the choices and hit submit<br><br>Rule:<br>No attempts limit for each question<br>No time limit<br>Socre only the answer is correct<br>Start new game anytime<p>`)// instruction content  
            console.log(math)
                generateQuestion(math)
            $(".c_option,#c_hole,#c_submit,#c_skip,.c_msg").show()
            $('.c_go,.select_operation').hide()
            }
            
        })
    })

    //chose quiz mode
    $("#quiz_mode").click(function(){
        $("#mainA").html("<h1>Welcome to Quiz Mode, how many questions would you like?</h1><img src=./images/operation.jpg alt=operation img>")
        $(this).hide()
        $("#practice_mode,.select_operation,.start_btn,#c_hole,.c_option,#c_submit,#c_skip,.c_msg,#b_msg,#c_profile,.c_infoBar").hide()
        $(".select_amount,.game_page").show()
        $("#c_display").html("Press <button class=c_go>Go</button> to begin")
        $(".select_amount button").click(function(event) {          
            math=5
            quiz=true
            for (let i in quiz_option) {
                if(event.target.id==i){
                    quiz_num=quiz_option[i]
                $(`#${i}`).addClass("selected_bg")
                }else{
                    $(`#${i}`).removeClass("selected_bg")
                }
                
            }
            $("#question span").text(quiz_num)            
           
            console.log(math,quiz_num)
        })
        $('.c_go').click(function() {
            if(math==5){
                $("#mainA").html("<p>Math topic:<br>Quiz<br><br>How to play:<br>Click on the correct answer from the choices and hit submit<br><br>Rule:<br>One attempt for each question<br>NO time limit<br>Socre only complete the entire quiz<p>") // instruction content 
                generateQuestion(math)
                $(".c_option,#c_hole,#c_submit,c_status,.c_infoBar").show()
                $(".c_go,#c_main,#c_profile,.select_amount").hide()
            }
            
        })
    })

    // click on the answers of the math question
    $("#c_option1,#c_option2,#c_option3,#c_option4").click(function(event) {
        let option = ['c_option1', 'c_option2', 'c_option3', 'c_option4']
        let element = $(`#${event.target.id}`)
        let select_option = event.target.id
        element.css("border-color","pink")
        option.forEach(function(item) {
            if (select_option != item) {
                $(`#${item}`).css('border-color', `${option_border_color}`)
            }
        })
        $("#c_hole").text(element.text())
    })

    
    // next button to generate new question
    $("#c_submit").click(function() {
        let input_ans = $("#c_hole").text()
        // correct answer selected
        if (correct_ans.toString() == input_ans) {
            correct_ques++
            console.log("correct ques:" + correct_ques)
            if(quiz)quiz_num--
            total_ques++
            $("#correct span").text(correct_ques)

            // start update localstorage for practice mode
            if(sessionStorage.getItem("status")=="on"){
            if(!quiz){
                let kid=JSON.parse(localStorage.getItem("kid"))
            let index_user=0;
            if(kid!=null){
                for(let i in kid){
                    if(kid[i].user==curr_user.trim() && kid[i].avatar==curr_avatar){
                        index_user=i
                        break;
                    }
                }
                console.log(math)
                switch (math){
                    case 1:{
                        kid[index_user].addQuestion+=1
                        break;
                    }case 2:{
                        kid[index_user].subQuestion+=1
                        break;
                    }case 3:{
                        kid[index_user].mulQuestion+=1
                        break;
                    }case 4:{
                        kid[index_user].divQuestion+=1
                        break;
                    }
                }
                console.log(kid)
                localStorage.setItem("kid",JSON.stringify(kid))
            }
            
            // End update localstorage for practice mode
            }
        }

            if(quiz){
                $(".c_status").append(`<span>${total_ques}</span>`)
                console.log("quiz correct")
                $(`.c_status span:nth-child(${total_ques})`).css('background-color','green')
                if(quiz_num!=0){
                    generateQuestion(math)
                    $("#c_hole").text("?")
                }
                
            }else{
                $(".c_msg p").fadeIn("slow")
                $(".c_msg p").css("background-color","green")
                $(".c_msg p").text("Good job, You must feel so proud of yourself,get ready for the next question")
                $("#c_submit").hide()
                setTimeout(()=>{                   
                    $("#c_submit").show()
                    $(".c_msg p").css("background-color","transparent")
                    $(".c_msg p").text("I’m glad you enjoy learning!")
                    if(quiz_num!=0){
                        generateQuestion(math)
                        $("#c_hole").text("?")
                    }
                },1500)              
            }

        }else{
            // incorrect answer selected
            if(quiz){
                $(".c_status").append(`<span>${total_ques+1}</span>`)
                $(`.c_status span:nth-child(${total_ques+1})`).css('background-color','red')
                quiz_num--
                total_ques++
                $("#correct span").text(correct_ques)
                if(quiz_num!=0){
                    generateQuestion(math)
                    $("#c_hole").text("?")
                }
            }else{
                $("#c_hole").text("?")
                $(".c_msg p").show()
                $(".c_msg p").css("background-color","red")
                $(".c_msg p").fadeOut()
                $(".c_msg p").fadeIn()
                $(".c_msg p").text("Keep on trying! Pick another answer")
            }
            
        }
        $("#question span").text(quiz_num)
        // when finish the last question of the test
        if(quiz_num==0){
            $("#mainA").text("").append("<img id=complete_quiz src=./images/c.png alt=celebration>")
            $("#c_hole,#c_submit,.c_status").hide()
            math = -1
            clearInterval(interval)
            $("#c_stop,.c_infoBar,.c_option,#c_hole,#c_submit").hide()
            $("#c_main,#c_profile").show()
            document.getElementById("c_display").innerHTML = `<table><caption>Good Job! ${username}</caption><tr><td>Total Question:</td><td>${total_ques}</td></tr> <tr><td>Correct:</td><td>${correct_ques}</td></tr>  <tr><td>Score:</td><td>${(correct_ques/total_ques*100).toFixed(0)} </td></tr></table>`
            
    
            // update localstorage data
            console.log(math,correct_ques/total_ques*100)
            if(sessionStorage.getItem("status")=="on"){
                let kid=JSON.parse(localStorage.getItem("kid"))
                let score=correct_ques/total_ques*100
                let index_user=0;
                for(let i in kid){
                    if(kid[i].user==curr_user.trim() && kid[i].avatar==curr_avatar){
                        index_user=i
                        break;
                    }
                }
                let bestScore=kid[index_user].bestScore
                let average=kid[index_user].averageScore
                kid[index_user].bestScore=bestScore>=score?bestScore:Number(score.toFixed(0))
                kid[index_user].averageScore=average==0?Number(score.toFixed(0)):Number(((score+average)/2).toFixed(1))
                kid[index_user].completedQuiz+=1
                console.log(kid[index_user].bestScore)
    
                console.log(kid[index_user])
                localStorage.setItem("kid",JSON.stringify(kid))
            }
            
                
        }
        
        
    })
    $("#c_skip").click(function(){
        generateQuestion(math)
        $("#c_hole").text("?")
        $(".c_msg p").text("Don't give up")
        $(".c_msg p").css("background-color","transparent")
    })
    $("#logout").click(function(){
        sessionStorage.setItem("status","off")
        sessionStorage.removeItem("curr_user")
        sessionStorage.removeItem("curr_avatar")
    })
})


// function to generate new question
function generateQuestion() {
    if (quiz) {
        math = Math.floor(Math.random() * 4 + 1)
        while (math == -1) {
            math = Math.floor(Math.random() * 4 + 1)
        }
        console.log(math)
    }
    console.log("generating" + "  math=:" + math)
    let first_quiz_num = 0
    let second_quiz_num = 0
    let symbol = ""
    let ques=""
    switch (math) {
        case 1:
            {
                first_quiz_num = random(50)
                second_quiz_num = random(50)
                correct_ans = first_quiz_num + second_quiz_num
                symbol = "+"
                break;
            };
        case 2:
            {
                first_quiz_num = random(100)
                do {
                    second_quiz_num = random(20)
                } while (first_quiz_num <= second_quiz_num)
                correct_ans = first_quiz_num - second_quiz_num
                console.log(first_quiz_num, second_quiz_num, correct_ans)
                symbol = "-"
                break;
            };
        case 3:
            {
                first_quiz_num = random(20)
                second_quiz_num = random(10)
                correct_ans = first_quiz_num * second_quiz_num
                symbol = "x"
                break;
            };
        case 4:
            {
                second_quiz_num = random(10)
                correct_ans = random(20)
                first_quiz_num = second_quiz_num * correct_ans
                symbol = "/"
                break;
            };

    }

    ques = first_quiz_num.toString() + "&nbsp; " + symbol + "&nbsp;&nbsp;" + second_quiz_num.toString() + "&nbsp;=&nbsp;&nbsp;"
    console.log("ques:" + ques)
    document.getElementById("c_display").innerHTML = ques
    generateOption()



}

//function to get random number 
function random(quiz_num) {
    return Math.floor(Math.random() * quiz_num + 1)
}
// function to generate 4 options for the question
function generateOption() {
    $("#c_option1,#c_option2,#c_option3,#c_option4").css("border-color", `${option_border_color}`)
    let options = []
    let range = 10;
    while (options.length < 3) {
        let randomOption = correct_ans - range + Math.floor(Math.random() * ((correct_ans + range) - (correct_ans - range) + 1))
        if (options.includes(randomOption) || randomOption == correct_ans || randomOption < 0) {
            continue
        } else {
            options.push(randomOption)
        }
    }
    console.log(options)
    let position = random(4)
    for (let i = 1; i <= 4; i++) {
        if (i == position) {
            $(`#c_option${i}`).text(correct_ans)
            options.push(correct_ans)
        } else {
            let option = options.shift()
            $(`#c_option${i}`).text(option)
            options.push(option)
        }
    }

    console.log(options)
}

    
