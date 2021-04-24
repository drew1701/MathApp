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
    $(".select_operation,.select_amount,.game_page").hide()
    // chose practice mode
    $("#practice_mode").click(function(){
        $(this).hide()
        $("#quiz_mode,#mainB").hide()
        $(".select_operation").show()
        $(".select_operation button").click(function(event) {
            $(`#${event.target.id}`).addClass("click")
            for (let i in practice_option) {
                if (event.target.id != i) {
                    $(`#${i}`).removeClass("click")
                }
                else  {
                    math=practice_option[i]
                }
            }
            console.log(math)
        })
    })

    //chose quiz mode
    $("#quiz_mode").click(function(){
        $(this).hide()
        $("#practice_mode,#mainA").hide()
        $(".select_amount").show()
        $(".select_amount button").click(function(event) {
            $(`#${event.target.id}`).addClass("click")
            for (let i in quiz_option) {
                if (event.target.id != i) {
                    $(`#${i}`).removeClass("click")
                }else {
                    math=5
                    quiz_num=quiz_option[i]
                }
            }
            console.log(math,quiz_num)
        })
    })

    //hit start button enter practice  or quiz

    $('#start_btn').click(function() {
        console.log(math,quiz_num)
        if (math == 0) {
            alert("pick something") //alert when user didn`t select any mode
        }
        else {
            $("#c_display").html("Press Go to begin")
            $(".select_operation, .select_amount,#start_btn").hide()
            $("#mainA,#mainB,.game_page").show()
            $("#c_hole,.c_option,#c_next").hide()
            $("#question span").text(quiz_num)
            
            if(math==5){
                quiz=true

                $("#mainA").html("<p>.....Quiz instruction......<p>") // instruction content 
                $('#c_profile').hide()


                
            }else{
                $("#mainA").html("<p>.....Practice instruction......<p>")// instruction content 
                
                $(".c_infoBar").hide()
                for(let i=0;i<quiz_num;i++){
                    $(".c_status").append(`<span>${i+1}</span>`)
                }
            }
        }
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

    // go button to start the game
    $('#c_go').click(function() {
        generateQuestion(math)
    
        $(".c_option,#c_hole,#c_next").show()
        console.log(quiz)
        if (quiz) {
            $("#c_go,#c_main,#c_profile").hide()
        } else {
            $('#c_go').hide()
        }


    })
    // next button to generate new question
    $("#c_next").click(function() {
        let input_ans = $("#c_hole").text()
        // correct answer selected
        if (correct_ans.toString() == input_ans) {
            $(".c_status").append(`<span>${total_ques+1}</span>`)
            $(`.c_status span:nth-child(${total_ques+1})`).css('background-color','green')
            $("#c_next").text("Next")
            correct_ques++
            
            console.log("correct ques:" + correct_ques)
            if(quiz)quiz_num--
            total_ques++
            $("#correct span").text(correct_ques)

            // start update localstorage for practice mode
            if(!quiz){
                let kid=JSON.parse(localStorage.getItem("kid"))
            let index_user=0;
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
            // End update localstorage for practice mode
            }
            
                
            if(quiz_num!=0){
                    generateQuestion(math)
                    $("#c_hole").text("?")
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
                $("#c_next").text("Try again")
                $("#c_next").fadeOut()
                $("#c_next").fadeIn()
            }
            
        }
        $("#question span").text(quiz_num)
        // when finish the last question of the test
        if(quiz_num==0){
            $("#c_hole,#c_next,.c_status").hide()
            math = -1
            clearInterval(interval)
            $("#c_stop,.c_infoBar,.c_option,#c_hole,#c_next").hide()
            $("#c_main,#c_profile").show(1000)
            document.getElementById("c_display").innerHTML = `<table><caption>Good Job! ${username}</caption><tr><td>Total Question:</td><td>${total_ques}</td></tr> <tr><td>Correct:</td><td>${correct_ques}</td></tr>  <tr><td>Score:</td><td>${(correct_ques/total_ques*100).toFixed(0)} </td></tr></table>`
            
    
            // update localstorage data
            console.log(math,correct_ques/total_ques*100)
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
                first_quiz_num = random(100)
                second_quiz_num = random(100)
                correct_ans = first_quiz_num + second_quiz_num
                symbol = "+"
                break;
            };
        case 2:
            {
                first_quiz_num = random(100)
                do {
                    second_quiz_num = random(100)
                } while (first_quiz_num <= second_quiz_num)
                correct_ans = first_quiz_num - second_quiz_num
                console.log(first_quiz_num, second_quiz_num, correct_ans)
                symbol = "-"
                break;
            };
        case 3:
            {
                first_quiz_num = random(20)
                second_quiz_num = random(20)
                correct_ans = first_quiz_num * second_quiz_num
                symbol = "X"
                break;
            };
        case 4:
            {
                second_quiz_num = random(20)
                correct_ans = random(20)
                first_quiz_num = second_quiz_num * correct_ans
                symbol = "/"
                break;
            };

    }

    ques = first_quiz_num.toString() + "&nbsp;&nbsp; " + symbol + "&nbsp;&nbsp;&nbsp;" + second_quiz_num.toString() + "&nbsp;&nbsp;&nbsp;=&nbsp;&nbsp;&nbsp;"
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

    
