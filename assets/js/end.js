const userInitials = document.querySelector('#userInitials')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

userInitials.addEventListener('keyup', () => {
    // makes it so that you can't enter a blank state.
    saveScoreBtn.disabled = !userInitials.value
    if (userInitials.value > 3) {
        saveScoreBtn.disabled
    }
    if (isNaN(userInitials)) {
        saveScoreBtn.disabled;
    }
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: userInitials.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('./highscores.html')
}