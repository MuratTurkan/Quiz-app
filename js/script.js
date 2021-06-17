const basla_button = document.querySelector(".basla_button");
const quiz = document.querySelector(".quiz");
const exit_btn = quiz.querySelector(".second_start ");
const continue_btn = quiz.querySelector(".second_start ");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeCount = document.querySelector(".timer .saniye");

let oyun_süresi =  10;
let que_count = 0;
let soru_numarasi = 1;
let puan = 0;
let sayaç;

// if startQuiz button clicked
basla_button.onclick = ()=>{
    quiz.classList.add("activeInfo"); //show info box
}

exit_btn.onclick = ()=>{
    quiz.classList.remove("activeInfo"); //hide info box
}

continue_btn.onclick = ()=>{
    quiz.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); 
    Soru_sayaci(1); 
    startTimer(10); 
}
const started_quiz = result_box.querySelector(".second_start .started");
// if startedQuiz button clicked
started_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    oyun_süresi = 10; 
    que_count = 0;
    soru_numarasi = 1;
    puan = 0;
    
    showQuetions(que_count); //calling showQestions function
    Soru_sayaci(soru_numarasi); 
    clearInterval(sayaç); //sayacı temizle
   
    startTimer(oyun_süresi); 
   
    next_btn.classList.remove("show"); //hide the next button
}

const bottom_ques_sayaç = document.querySelector("footer .toplam_soru");

function showQuetions(index){
    const soru_text = document.querySelector(".soru_text");
//Sorulara fotoğraf ve video ekleme 
    let photo = "";
    let video="";
    let Soru;
    if (questions[index].soru_num === 1) {
        photo = `
        <img class='answer-image' src='minerva.jpg'>` 
        Soru = '<span>'+ questions[index].soru_num + ". " + questions[index].question +'<br>'+ photo +'</span>';
    }else if(questions[index].soru_num === 2) {
        video = `<video width="320" height="240" controls autoplay> <source src="voldemort.mp4" type="video/mp4"'>
</video>`
        Soru = '<span>'+ questions[index].soru_num + ". " + questions[index].question +'<br>'+ video +'</span>';
   
    } else {
        Soru = '<span>'+ questions[index].soru_num + ". " + questions[index].question +'</span>';
    }
    let option_tag = '<div class="option"><span>'+ questions[index].seçenekler[0] +'</span></div>';
    
        for( i=1;i<=5;i++) {
            if(questions[index].seçenekler[i] != undefined) {
                option_tag+='<div class="option"><span>'+ questions[index].seçenekler[i] +'</span></div>'
            }
        };

    soru_text.innerHTML = Soru; 
    option_list.innerHTML = option_tag; 
    
    const option = option_list.querySelectorAll(".option");
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
//optionSelected çalıştığında kullanılan function
function optionSelected(cevap){
    clearInterval(sayaç); //sayacı temizle
    let Kullanıcı_cvp = cevap.textContent;
    let true_ans = questions[que_count].cevap; 
    const allOptions = option_list.children.length; 

    if(Kullanıcı_cvp == true_ans){ 
        puan += 1; 
        cevap.classList.add("correct"); 
       
    }else{
        cevap.classList.add("incorrect"); 
    for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == true_ans){ 
                option_list.children[i].setAttribute("class", "option correct"); 
                }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }
    window.setTimeout(auto_past, 3000)
}
auto_past = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++; 
        soru_numarasi++; 
        showQuetions(que_count); //yeni soru
        Soru_sayaci(soru_numarasi); //soru numarasını gönderme
        clearInterval(sayaç); //sayacı temizleme
        startTimer(oyun_süresi); 
   
        next_btn.classList.remove("show"); //geçişi gizle
    }else{
        SonucEkrani(); //sonuç ekranını göster
    }
}
function SonucEkrani(){
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    let scoreTag = '<span>Toplam doğru sayısı:  <p>'+ puan +'</p> / <p>'+ questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;  
}
//süre ve oto cevap
function startTimer(time){
    sayaç = setInterval(timer, 1000);// 1 saniye bekle ve azalt
    function timer(){
        timeCount.textContent = time; 
        time--; 
       if(time < 0){ 
            clearInterval(sayaç); 
            const allOptions = option_list.children.length; 
            let true_ans = questions[que_count].cevap;
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == true_ans){ 
                option_list.children[i].setAttribute("class", "option correct"); 
                   }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); 
            }
            window.setTimeout(auto_past, 3000)
        }
    }
}
function Soru_sayaci(index){
    let totalQueCounTag = '<span>Skor: <p>' +puan + '</p> / <p>'+ index +' </p> </span>';
    bottom_ques_sayaç.innerHTML = totalQueCounTag;  
}

