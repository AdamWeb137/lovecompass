class QuizHandler {

    static questions = love_questions;
    static answers = [];

    static question_el;
    static options_el;
    static num_el;

    static prev_btn;
    static next_btn;

    static curr_question = 0;

    static render_question(n){

        if(n > QuizHandler.questions.length || n < 0){
            return;
        }

        if(n > 0){
            QuizHandler.prev_btn.style.visibility = "visible";
        }else{
            QuizHandler.prev_btn.style.visibility = "hidden";
        }

        if(n < QuizHandler.answers.length){
            //already answered question
            QuizHandler.next_btn.style.visibility = "visible";
            if(n < QuizHandler.questions.length-1){
                QuizHandler.next_btn.innerHTML = "Next";
                QuizHandler.next_btn.className = "btn-red";
            }else{
                QuizHandler.next_btn.innerHTML = "Get Results";
                QuizHandler.next_btn.className = "btn-blue";
            }
        }else{
            QuizHandler.next_btn.style.visibility = "hidden";
        }

        let q = QuizHandler.questions[n];
        QuizHandler.curr_question = n;

        QuizHandler.question_el.innerHTML = q.question;
        QuizHandler.options_el.innerHTML = "";
        QuizHandler.num_el.innerHTML = `Question ${n+1}/${QuizHandler.questions.length}`;

        for(let i = 0; i < q.answers.length; i++){
            let ans = q.answers[i];

            let inp = document.createElement("input");
            inp.type = "radio";
            inp.id = `option_${i}`;
            inp.name = "ans";
            inp.value = i;

            QuizHandler.options_el.appendChild(inp);
            QuizHandler.options_el.innerHTML += `: ${ans.text}<br>`;

        }

        if(QuizHandler.answers.length > n){
            QuizHandler.options_el.querySelector(`#option_${QuizHandler.answers[n]}`).checked = true;
        }
    }

    static next(){
        if(QuizHandler.curr_question == QuizHandler.questions.length-1){
            let pos = QuizHandler.results();
            window.location.href = `results.html?x=${pos[0]}&y=${pos[1]}`;
        }
        QuizHandler.render_question(QuizHandler.curr_question+1);
    }

    static previous(){
        if(QuizHandler.curr_question > 0){
            QuizHandler.render_question(QuizHandler.curr_question-1);
        }
    }

    static results(){
        let x = 0;
        let y = 0;

        for(let qn = 0; qn < QuizHandler.answers.length; qn++){
            let an = QuizHandler.answers[qn];
            let ans = QuizHandler.questions[qn].answers[an];
            x += ans.x ?? 0;
            y += ans.y ?? 0;
        }

        x /= QuizHandler.answers.length;
        y /= QuizHandler.answers.length;

        return [x,y];
    }

}

window.addEventListener("load",(e)=>{
    QuizHandler.question_el = document.querySelector("#question_text");
    QuizHandler.options_el = document.querySelector("#options");
    QuizHandler.num_el = document.querySelector("#qnum");

    QuizHandler.prev_btn = document.querySelector("#prev_btn");
    QuizHandler.prev_btn.addEventListener("mouseup", QuizHandler.previous);
    QuizHandler.next_btn = document.querySelector("#next_btn");
    QuizHandler.next_btn.addEventListener("mouseup", QuizHandler.next);

    QuizHandler.options_el.addEventListener("click", (e)=>{
        let inp = e.target;
        if(inp.nodeName == "INPUT"){
            if(inp.checked){
                let an = Number(inp.value);
                let qn = QuizHandler.curr_question;
                if(qn+1 > QuizHandler.answers.length){
                    QuizHandler.answers.push(an);
                }else{
                    QuizHandler.answers[qn] = an;
                }
                
                QuizHandler.next_btn.style.visibility = "visible";
                if(qn < QuizHandler.questions.length-1){
                    QuizHandler.next_btn.innerHTML = "Next";
                    QuizHandler.next_btn.className = "btn-red";
                }else{
                    QuizHandler.next_btn.innerHTML = "Get Results";
                    QuizHandler.next_btn.className = "btn-blue";
                }

            }
        }
    });

    QuizHandler.render_question(0);
})