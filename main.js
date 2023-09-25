var questions = [];
var answers = [];
var step = 0;

const fetchData = async () =>{

    try {
        const response = await fetch('./questions.json');
        const json = await response.json();
        questions = json;

        
        questions.map((data) =>{
            var newQuestion = document.createElement("button");
            newQuestion.classList.add("Question-Step");
    
            var questionContainer = document.getElementById("question-container");
            newQuestion.innerHTML = data.name;

            questionContainer.appendChild(newQuestion);

            newQuestion.addEventListener("click", () =>{
                answers.push(newQuestion.innerHTML);
                

                for (let i = 0; i < questions.length; i++) {
                    if (newQuestion.innerHTML == questions[i].name) {
                        questions = json[i];
                        
                        break;
                    }
                    
                }
                
                console.log(questions);
            })

            

            
        })
        
        
    } catch (error) {
        console.log(error);   
    }
}

fetchData();


const questionDeactive = ()=> {

}