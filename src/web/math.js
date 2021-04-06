var math = 0
var my_ans = ""
var correct_ans = ""
var correct_ques = 0
var total_ques = 0
var quiz = false
var time = 0
var option_border_color = ""

var maths = {
    add: 1,
    sub: 2,
    mul: 3,
    div: 4,
    quiz: 5
}
$(document).ready($(function() {
    // activity buttons setup
    $(".current_page").hide()
    document.getElementById("c_display").innerHTML = "Press Go to begin"

    $("#add,#sub,#mul,#div,#quiz").click(function(event) {
        $(`#${event.target.id}`).addClass("click")
        for (let i in maths) {
            if (event.target.id != i) {
                $(`#${i}`).removeClass("click")
            } else {
                math = maths[i]
                console.log(i)
                console.log(math)
            }
        }
    })


    $('#start_btn').click(function() {
        if (math == 0) {
            alert("select your challenge")
        } else {
            $(".select_page,#c_hole,.c_option,#c_next").hide()
            $(".current_page").show()
            if (quiz) {
                $('#c_profile,#c_stop').hide()
            } else {
                $(".c_infoBar,#c_stop").hide()
            }
        }
    })
    $("#c_option1,#c_option2,#c_option3,#c_option4").click(function(event) {
        let option = ['c_option1', 'c_option2', 'c_option3', 'c_option4']
        let element = $(`#${event.target.id}`)
        let select_option = event.target.id
        element.css("border-color", "pink")
        option.forEach(function(item) {
            if (select_option != item) {
                $(`#${item}`).css('border-color', `${option_border_color}`)
            }
        })
        $("#c_hole").text(element.text())
    })
    $('#c_go').click(function() {
        interval = setInterval(timer, 1000)
        generateQuestion(math)
        $(".c_option,#c_hole,#c_next").show()
        if (quiz) {
            $("#c_stop,.c_infoBar").show()
            $("#c_go,#c_main,#c_profile").hide()
        } else {
            $('#c_stop,#c_go').hide()
        }


    })
    $("#c_next").click(function() {
        let input_ans = $("#c_hole").text()
        let bg_color = $(".c_screen").css("background-color")
        if (correct_ans.toString() == input_ans) {
            correct_ques++
            console.log("correct ques:" + correct_ques)
        }
        total_ques++
        $("#question").text(total_ques)
        $("#correct").text(correct_ques)
        let change_color = correct_ans.toString() == input_ans ? "lightgreen" : "red"
        $(".c_screen").css("background-color", `${change_color}`)
        $("#c_stop").hide()
        setTimeout(() => {
            $(".c_screen").css("background-color", `${bg_color}`)
            if (quiz) $("#c_stop").show()
        }, 1000);

        generateQuestion(math)
        $("#c_hole").text("?")
    })
    $('#c_stop').click(function() {
        math = -1
        clearInterval(interval)
        $("#c_stop,.c_infoBar,.c_option,#c_hole,#c_next").hide()
        $("#c_main,#c_profile").show(1000)
        document.getElementById("c_display").innerHTML = `<table><caption>Good Job!</caption><tr><td>Total Question:</td><td>${total_ques}</td></tr> <tr><td>Correct:</td><td>${correct_ques}</td></tr> <tr><td>Time:</td><td>${time} s</td></tr></table>`
    })

}))

function timer() {
    time++
    $("#time").text(time)
    $("#time").attr("style", "animation:timeEffect 1s infinite")
}

function generateQuestion() {
    if (math == 5) {
        quiz = true
    }
    if (quiz) {
        math = Math.floor(Math.random() * 4 + 1)
        while (math == -1) {
            math = Math.floor(Math.random() * 4 + 1)
        }
        console.log(math)
    }
    console.log("generating" + "  math=:" + math)
    let first_num = 0
    let second_num = 0
    let symbol = ""
    let ques=""
    switch (math) {
        case 1:
            {
                first_num = random(500)
                second_num = random(500)
                correct_ans = first_num + second_num
                symbol = "+"
                break;
            };
        case 2:
            {
                first_num = random(500)
                do {
                    second_num = random(500)
                } while (first_num <= second_num)
                correct_ans = first_num - second_num
                console.log(first_num, second_num, correct_ans)
                symbol = "-"
                break;
            };
        case 3:
            {
                first_num = random(20)
                second_num = random(20)
                correct_ans = first_num * second_num
                symbol = "X"
                break;
            };
        case 4:
            {
                second_num = random(20)
                correct_ans = random(20)
                first_num = second_num * correct_ans
                symbol = "/"
                break;
            };

    }

    ques = first_num.toString() + "&nbsp;&nbsp; " + symbol + "&nbsp;&nbsp;&nbsp;" + second_num.toString() + "&nbsp;&nbsp;&nbsp;="
    console.log("ques:" + ques)
    document.getElementById("c_display").innerHTML = ques
    generateOption()



}

function random(num) {
    return Math.floor(Math.random() * num + 1)
}

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