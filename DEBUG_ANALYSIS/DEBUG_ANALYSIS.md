# Screenshot -1
# Before fetchQuestions:
The checkUsername function determined that no username cookie exists getCookie("username") returned an empty string.
showLoading(true) was called, which should make the loading container visible  

# After fetchQuestions (Paused):
The fetch request to the Open Trivia DB API is about to execute. The debugger is paused before the .then chain, so no questions have been fetched or displayed yet.
The question-container remains hidden, consistent with the checkUsername logic and the showLoading(true) call.

# Screenshot-2
# Before checkUsername:
The DOMContentLoaded event listener has triggered, and fetchQuestions and checkUsername were called .
The getCookie function  has executed, searching for a cookie named "username".


# After checkUsername (Paused):
The username variable is about to be set to the result of getCookie("username"), which is "" (empty string).

# Screenshot-3
# Before fetchQuestions (Previous Steps):
From the previous debugging sessions, we know checkUsername was called and initially found no username cookie, showing the username input field.
A username must have been provided (via form submission), setting the "username" cookie and triggering a UI update to show the question-container and hide the username input field (lines 44-45 in checkUsername).

# After fetchQuestions (Paused):
The data.results array contains 10 trivia questions, as expected from the API .
The displayQuestions function is about to be called with data.results, which will render the questions in the question-container. 