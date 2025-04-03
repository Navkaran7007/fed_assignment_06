/**
 * Initializes the Trivia Game when the DOM is fully loaded.
 */
document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("trivia-form");
	const questionContainer = document.getElementById("question-container");
	const newPlayerButton = document.getElementById("new-player");

	// Initialize the game
	fetchQuestions();
	//displayScores();
	checkUsername();

function setCookie(name, value, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	const expires = "expires=" + d.toUTCString();
	document.cookie = name + "=" + value + ";" + expires + ";path=/";
	}

function getCookie(name) {
        let cname = name + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(cname) == 0) {
                return c.substring(cname.length, c.length);
            }
        }
        return "";
    }

function checkUsername() {
    const username = getCookie("username");
    const usernameInput = document.getElementById("username");
    const questionContainer = document.getElementById("question-container");
    const newPlayerButton = document.getElementById("new-player");

    if (username) {
        usernameInput.classList.add("hidden"); 
        questionContainer.classList.remove("hidden"); 
        newPlayerButton.classList.remove("hidden"); 
    } else {
        usernameInput.classList.remove("hidden"); 
        questionContainer.classList.add("hidden"); 
        newPlayerButton.classList.add("hidden");
    }
}

	/**
	 * Fetches trivia questions from the API and displays them.
	 */
	function fetchQuestions() {
		showLoading(true); // Show loading state

		fetch("https://opentdb.com/api.php?amount=10&type=multiple")
			.then((response) => response.json())
			.then((data) => {
				displayQuestions(data.results);
				showLoading(false); // Hide loading state
			})
			.catch((error) => {
				console.error("Error fetching questions:", error);
				showLoading(false); // Hide loading state on error
			});
	}

	/**
	 * Toggles the display of the loading state and question container.
	 *
	 * @param {boolean} isLoading - Indicates whether the loading state should be shown.
	 */
	function showLoading(isLoading) {
		document.getElementById("loading-container").classList = isLoading
			? ""
			: "hidden";
		document.getElementById("question-container").classList = isLoading
			? "hidden"
			: "";
	}

	/**
	 * Displays fetched trivia questions.
	 * @param {Object[]} questions - Array of trivia questions.
	 */
	function displayQuestions(questions) {
		questionContainer.innerHTML = ""; // Clear existing questions
		questions.forEach((question, index) => {
			const questionDiv = document.createElement("div");
			questionDiv.innerHTML = `
                <p>${question.question}</p>
                ${createAnswerOptions(
					question.correct_answer,
					question.incorrect_answers,
					index
				)}
            `;
			questionContainer.appendChild(questionDiv);
		});
	}

	/**
	 * Creates HTML for answer options.
	 * @param {string} correctAnswer - The correct answer for the question.
	 * @param {string[]} incorrectAnswers - Array of incorrect answers.
	 * @param {number} questionIndex - The index of the current question.
	 * @returns {string} HTML string of answer options.
	 */
	function createAnswerOptions(
		correctAnswer,
		incorrectAnswers,
		questionIndex
	) {
		const allAnswers = [correctAnswer, ...incorrectAnswers].sort(
			() => Math.random() - 0.5
		);
		return allAnswers
			.map(
				(answer) => `
            <label>
                <input type="radio" name="answer${questionIndex}" value="${answer}" ${
					answer === correctAnswer ? 'data-correct="true"' : ""
				}>
                ${answer}
            </label>
        `
			)
			.join("");
	}

	function calculateScore() {
		let score = 0;
	
		const selectedAnswers = document.querySelectorAll("input[type='radio']:checked");
	
		selectedAnswers.forEach((input) => {
			if (input.dataset.correct === "true") {
				score++;
			}
		});
	
		return score;
	}

	function newPlayer() {
		setCookie("username", "", -1); 
		checkUsername();  
		document.getElementById("score-display").textContent = ""; 
	}


	// Event listeners for form submission and new player button
	form.addEventListener("submit", handleFormSubmit);
	newPlayerButton.addEventListener("click", newPlayer);

	/**
	 * Handles the trivia form submission.
	 * @param {Event} event - The submit event.
	 */
	function handleFormSubmit(event) {
		event.preventDefault();
		const usernameInput = document.getElementById("username");
		const username = usernameInput.value.trim();

		if (username) {
			setCookie("username", username, 100);
		}

		checkUsername();

		const score = calculateScore();
		console.log(`Score for ${username || getCookie("username")}: ${score}`);

		const scoreDisplay = document.getElementById("score-display");
		if (scoreDisplay) {
			scoreDisplay.textContent = `Your score: ${score}/10`;
		}

		fetchQuestions();
		usernameInput.value = "";
	}
});
