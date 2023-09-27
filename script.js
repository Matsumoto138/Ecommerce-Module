var question_url = "./questions.json"
var product_url = "./products.json"

var dressesQuestions = [];
var clothingQuestions = [];
var accessoriesQuestions = [];
var choosenCategory = [];

var prvBtn = document.getElementById("prvBtn");
var nextBtn = document.getElementById("nextBtn");
var questionContainer = document.getElementById("question-container");
var progresSteps = document.querySelectorAll(".progress-step")


var answers = [];
var products = [];
var step = 0;
var checkClick = false;

const fetchQuestions = async () =>{
    try {
        const response = await fetch(question_url);
        const json = await response.json();
        dressesQuestions = json[0].steps;
        clothingQuestions = json[1].steps;
        accessoriesQuestions = json[2].steps;

        
        choosenCategory = dressesQuestions;
        var newQuestion = document.createElement("div");
        var newQuestionTitle = document.createElement("h3");
        var newQuestionSubtitle = document.createElement("p");

        newQuestion.classList.add("Question-Step");
        newQuestionTitle.classList.add("Question-Title");
        newQuestionSubtitle.classList.add("Question-Subtitle");
            
        newQuestionTitle.textContent = choosenCategory[0].title;
        newQuestionSubtitle.textContent = choosenCategory[0].subtitle;

        newQuestion.appendChild(newQuestionSubtitle);
        newQuestion.appendChild(newQuestionTitle);
        
            
        choosenCategory[0].answers.map((data) =>{
        var newQuestionButton = document.createElement("button");
        newQuestionButton.classList.add("Question-Buttons");
        newQuestionButton.textContent = data;
        newQuestion.appendChild(newQuestionButton);
        })

        var questionContainer = document.getElementById("question-container");
            questionContainer.appendChild(newQuestion);


        var getAnswer = document.getElementsByClassName("Question-Buttons")
        getAnswer[1].addEventListener("click", ()=>{
            checkClick = true;
            if (getAnswer[1].textContent == "Clothing") {
                choosenCategory = clothingQuestions;
                
            }
        })

        getAnswer[2].addEventListener("click", ()=>{
            checkClick = true;
            if (getAnswer.textContent == "Accessories") {
                choosenCategory = accessoriesQuestions;
            }
        })

        questionContainer.addEventListener("click", function (event) {
            var target = event.target;
            checkClick = true;
            if (target.classList.contains("Question-Buttons")) {
                answers.push(target.textContent);
                
                target.style.backgroundColor = "Black";
                target.style.color = "White";
            }
        });

        nextBtn.addEventListener("click", () => {
            if(checkClick){
                if (step < choosenCategory.length-1) {
                    step++;
                    newQuestionTitle.textContent = choosenCategory[step].title;
                    newQuestionSubtitle.textContent = choosenCategory[step].subtitle;
    
                    var buttonsToRemove = newQuestion.querySelectorAll(".Question-Buttons");
                    buttonsToRemove.forEach(function(button) {
                    button.remove();
                    })
                
                    choosenCategory[step].answers.map((data) =>{
                    
    
                    var newQuestionButton = document.createElement("button");
                    newQuestionButton.classList.add("Question-Buttons");
                    newQuestionButton.textContent = data;
                    newQuestion.appendChild(newQuestionButton);
                    })
    
                    progresSteps.forEach(progress =>{
                        progress.classList.contains("progress-step-active") &&
                        progress.classList.remove("progress-step-active")
                    })
                    progresSteps[step].classList.add("progress-step-active");

                    checkClick = false;
                }
    
                else{
                    fetchData();
                }
            }

            else{
                alert("Please select an answer");
            }
            
            
                
        })

        prvBtn.addEventListener("click", () => {
            if (step > 0) {
                step--;
                
                newQuestionTitle.textContent = choosenCategory[step].title;
                newQuestionSubtitle.textContent = choosenCategory[step].subtitle;

                var buttonsToRemove = newQuestion.querySelectorAll(".Question-Buttons");
                buttonsToRemove.forEach(function(button) {
                button.remove();
                })
                
                choosenCategory[step].answers.map((data) =>{
                    

                    var newQuestionButton = document.createElement("button");
                    newQuestionButton.classList.add("Question-Buttons");
                    newQuestionButton.textContent = data;
                    newQuestion.appendChild(newQuestionButton);
                })
                
                progresSteps.forEach(progress =>{
                    progress.classList.contains("progress-step-active") &&
                    progress.classList.remove("progress-step-active")
                })
                progresSteps[step].classList.add("progress-step-active");
            }

            else{
                alert("No more questions.");
            }
            
            
                
        })



        

    }catch (error) {
        console.log(error);   
    }
}

fetchQuestions()

const fetchData = async () =>{
    var categoryAnswer = answers[0];
    var colorAnswer = answers[1];
    var priceRange = answers[2].split("-");
    var minPrice = parseFloat(priceRange[0]);
    var maxPrice = parseFloat(priceRange[1]);

    try {
        const response = await fetch(product_url);
        const json = await response.json();
        

        json.map((data) => {
            if(data.category.includes(categoryAnswer) && data.colors.includes(colorAnswer.toLowerCase()) && minPrice <= data.price && maxPrice >= data.price){
                products.push(data);
            }
        })
        console.log(products);

        var firstContainer = document.getElementById("first-container");
        firstContainer.style.display = "none";

        if (products.length > 0) {
            var mySwiper = document.createElement("div");
            var swiperWrapper = document.createElement("div");
            mySwiper.classList.add("swiper");
            swiperWrapper.classList.add("swiper-wrapper");

            var secondContainer = document.getElementById("second-container");
            secondContainer.appendChild(mySwiper);

            mySwiper.appendChild(swiperWrapper);

            products.map((data) => {
                var swiperSlide = document.createElement("div");
                swiperSlide.classList.add("swiper-slide");
                swiperWrapper.appendChild(swiperSlide);

                var productImageWrapper = document.createElement("div");
                productImageWrapper.classList.add("product-image-wrapper");
                swiperSlide.appendChild(productImageWrapper);

                var productImage = document.createElement("img");
                productImage.src = data.image;
                productImage.loading = "lazy";
                productImageWrapper.appendChild(productImage);
                
                
                
                var productTitle = document.createElement("p");
                var productOldPrice = document.createElement("h5");
                var productPrice = document.createElement("p");

                productTitle.classList.add("product-title");
                productOldPrice.classList.add("product-old-price");
                productPrice.classList.add("product-price");

                swiperSlide.appendChild(productTitle);
                swiperSlide.appendChild(productOldPrice);
                swiperSlide.appendChild(productPrice);

                productTitle.textContent = data.name;
                productPrice.textContent = data.currency+data.price;
                if (data.oldPrice != undefined) {
                    productOldPrice.textContent = data.currency+data.oldPrice;
                }

                var viewButton = document.createElement("a");
                viewButton.classList.add("view-button");
                viewButton.textContent = "View Product";
                viewButton.setAttribute("href", data.url);
                swiperSlide.appendChild(viewButton);
               
            })
            
            var swiperNavigationNext = document.createElement("div");
            var swiperNavigationPrev = document.createElement("div");

            swiperNavigationNext.classList.add("swiper-button-next");
            swiperNavigationPrev.classList.add("swiper-button-prev");

            mySwiper.appendChild(swiperNavigationNext);
            mySwiper.appendChild(swiperNavigationPrev);

            var swiperPagination = document.createElement("div");
            swiperPagination.classList.add("swiper-pagination");
            mySwiper.appendChild(swiperPagination);

            const swiper = new Swiper(".swiper", {
                pagination: {
                    el:".swiper-pagination",
                    dynamicBullets: true,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },

                centeredSlides: true,
            })
        }
        
    } catch (error) {
        console.log(error);
    }
}