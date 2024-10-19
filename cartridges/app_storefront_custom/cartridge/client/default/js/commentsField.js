window.updateCharacterCount = function () {
    const commentsField = document.getElementById('comments');
    const charCountDisplay = document.getElementById('charCount');
    const charCount = commentsField.value.length;
    const remainingCharacters = 150 - charCount;
    charCountDisplay.innerText = `You have ${remainingCharacters} characters left out of 150`;
};
