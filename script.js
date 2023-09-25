var dressesQuestions = [];
var clothingQuestions = [];
var accessoriesQuestions = [];
var choosenCategory = [];

var prvBtn = document.getElementById("prvBtn");
var nextBtn = document.getElementById("nextBtn");
var questionContainer = document.getElementById("question-container");


var answers = [];
var products = [];
var step = 0;

const fetchQuestions = async () =>{
    try {
        const response = await fetch('./questions.json');
        const json = await response.json();
        dressesQuestions = json[0].steps;
        clothingQuestions = json[1].steps;
        accessoriesQuestions = json[2].steps;

        
        choosenCategory = dressesQuestions;
        var newQuestion = document.createElement("div")
        var newQuestionTitle = document.createElement("h3")
        var newQuestionSubtitle = document.createElement("p")

        newQuestion.classList.add("Question-Step")
        newQuestionTitle.classList.add("Question-Title")
        newQuestionSubtitle.classList.add("Question-Subtitle")
            
        newQuestionTitle.textContent = choosenCategory[0].title
        newQuestionSubtitle.textContent = choosenCategory[0].subtitle

        newQuestion.appendChild(newQuestionSubtitle)
        newQuestion.appendChild(newQuestionTitle)
        
            
        choosenCategory[0].answers.map((data) =>{
        var newQuestionButton = document.createElement("button")
        newQuestionButton.classList.add("Question-Buttons")
        newQuestionButton.textContent = data
        newQuestion.appendChild(newQuestionButton)
        })

        var questionContainer = document.getElementById("question-container");
            questionContainer.appendChild(newQuestion);


        var getAnswer = document.getElementsByClassName("Question-Buttons")
        getAnswer[1].addEventListener("click", ()=>{
            
            if (getAnswer[1].textContent == "Clothing") {
                choosenCategory = clothingQuestions
                
            }
        })

        getAnswer[2].addEventListener("click", ()=>{
            
            if (getAnswer.textContent == "Accessories") {
                choosenCategory = accessoriesQuestions
            }
        })

        questionContainer.addEventListener("click", function (event) {
            var target = event.target;
        
            if (target.classList.contains("Question-Buttons")) {
                answers.push(target.textContent);
                
                target.style.backgroundColor = "Black"
                target.style.color = "White"
            }
        });

        nextBtn.addEventListener("click", () => {
            if (step < choosenCategory.length-1) {
                step++;
                newQuestionTitle.textContent = choosenCategory[step].title
                newQuestionSubtitle.textContent = choosenCategory[step].subtitle

                var buttonsToRemove = newQuestion.querySelectorAll(".Question-Buttons");
                buttonsToRemove.forEach(function(button) {
                button.remove();
                })
            
                choosenCategory[step].answers.map((data) =>{
                

                var newQuestionButton = document.createElement("button")
                newQuestionButton.classList.add("Question-Buttons")
                newQuestionButton.textContent = data
                newQuestion.appendChild(newQuestionButton)
                })
            }

            else{
                fetchData();
            }
            
                
        })

        prvBtn.addEventListener("click", () => {
            if (step > 0) {
                step--;
                
                newQuestionTitle.textContent = choosenCategory[step].title
                newQuestionSubtitle.textContent = choosenCategory[step].subtitle

                var buttonsToRemove = newQuestion.querySelectorAll(".Question-Buttons");
                buttonsToRemove.forEach(function(button) {
                button.remove();
                })
                
                choosenCategory[step].answers.map((data) =>{
                    

                    var newQuestionButton = document.createElement("button")
                    newQuestionButton.classList.add("Question-Buttons")
                    newQuestionButton.textContent = data
                    newQuestion.appendChild(newQuestionButton)
                })
            }

            else{
                alert("No more questions.")
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
        const response = await fetch('./products.json');
        const json = await response.json();
        

        json.map((data) => {
            if(data.category.includes(categoryAnswer) && data.colors.includes(colorAnswer.toLowerCase()) && minPrice <= data.price && maxPrice >= data.price){
                products.push(data)
            }
        })
        console.log(products);
        
    } catch (error) {
        console.log(error);
    }
}