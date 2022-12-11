let que_count = 0;
let score = 36;
const count = document.querySelector(".count")
let b = 0;

function getRandomInt(que_count) {
    const img_tag = document.querySelector(".answer");
    const nameBird = document.querySelector(".nameBird");
    const imgCor = document.querySelector(".headBird")

    nameBird.innerHTML ="*******";
    img_tag.innerHTML = "Выберите вариант ответа"
    document.querySelector('.footer__button').disabled = true;
    
    const vid = document.querySelectorAll(".header__page");
    let arr = [birdsDataOne, birdsDataTwo, birdsDatathree, birdsDataFour, birdsDataFive, birdsDataSix, birdsDataFSeven]
    console.log(que_count)
    
    vid[que_count].classList.add("active");
    if (que_count != 0) {
        vid[que_count-1].classList.add("inactive")
    }
    showQuestion(Math.floor(Math.random() * (6)), arr[que_count], score);
}
getRandomInt(que_count); 

function showQuestion(i, birdsData) {
    const option_list = document.querySelector(".answers")
    let option_tag = birdsData.map( (bird) => '<div class="option">' + bird.name + '</div>').join('');
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let j = 0; j < option.length; j++) {
        option[j].addEventListener('click', () => optionSelected( option[j], j , i, birdsData));
    }
}     

function optionSelected(container, i, k, birdsData) {
    const but_next = document.querySelector(".footer__button");
    const isRightAnswer = i === k;
    const img_tag = document.querySelector(".answer");

    img_tag.innerHTML = "<div class='nameSpecies'><div>" + birdsData[i].name + "</div>" +
                          "<div>" + birdsData[i].species + "</div>" +
                        "<div class='discription'>" + birdsData[i].description + "</div>"; 

    console.log("optionSel, " + score);

    if (isRightAnswer) {
        container.classList.add("correct");
        const nameBird = document.querySelector(".nameBird");

        document.getElementById('sound').play()

        but_next.onclick = () => { nextQuestion(birdsData[i].gid); };
        nameBird.innerHTML = birdsData[i].name;
        document.querySelector('.footer__button').disabled = false;
        count.innerHTML = score - 6 * ( 5 - birdsData[i].gid);
        b = 1;
    } else {
        if (b == 0) {
            document.getElementById('sound2').play()
            score = score - 1;
            container.classList.add("incorrect");
        }
}
}

function nextQuestion(i) {
    if ( i < 6) {
        getRandomInt(i);
        b = 0; 
    } else {
        document.querySelector('.main').style.display = "none";
        document.querySelector('.main_modal').style.display = "block";
        const result_but = document.querySelector('.button')
        const result_count = document.querySelector(".quastion_result");
        result_count.innerHTML = score + '<br>' + 'Отличный результат';
        document.querySelector('.footer__button').disabled = true;
        console.log(score)
        if (score != 30) {
            result_but.innerHTML = "<button class='game_again' >Пройти еще раз</button><br>" +
            "<button class='game_again'><a href='test.html'>Вернутся на стартовую страницу</a></button>";
            result_but.addEventListener('click', () => location = 'pageQuiz.html');
        }
    }
}