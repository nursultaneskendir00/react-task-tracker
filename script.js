let clicks =0;
 const startButton=document.getElementById("start-button");
 const pageTitle=document.getElementById("page-title");
 const clicksCount=document.getElementById("click-count");
 const resetbutton = document.getElementById("reset-button");
 startButton.addEventListener("click", function() {
    clicks=clicks+1;
    pageTitle.textContent ="Нурсултан - будущий разработчик!";
    startButton.textContent = "Путь - начался!";
    clicksCount.textContent ="Прогресс: " + clicks + " из 5";

        if (clicks === 5) {
        pageTitle.textContent="Цель выполнена: 5 шагов!";
        }
     });

 resetbutton.addEventListener("click", function () {
 clicks = 0;
 pageTitle.textContent="Нурсултан";
 startButton.textContent="Начать путь";
 clicksCount.textContent="прогресс: 0 из 5";
 });