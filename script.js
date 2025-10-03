// Auto roll dice when the page loads
window.addEventListener('load', () => { if (rollBtn) rollBtn.focus(); });
// Auto focus the roll button so user can hit Enter to roll
window.addEventListener('load', () => { if (rollBtn) rollBtn.focus(); });

window.onload = () => {
    randomDice();
};


const dice = document.querySelector('.dice');
const rollBtn = document.querySelector('.roll-btn');

/* Replace with API
const randomDice = () => {
    const random = Math.floor(Math.random() * 6) + 1; // 1..6 inclusive
    rollDice(random);
}
*/

/* Fetch API with best practices such as fallback option if API fails */
async function randomDice() {
    try {
        // Call API
        const res = await fetch('https://dice-roller-api-fak-cybpc2h6djf5c5ex.canadacentral-01.azurewebsites.net/api/random?min=1&max=6');

        // Await response
        const data = await res.json();

        // Extract the rand value
        rollDice(data.value);
    }
    // Error handeling
    catch (err) {
        console.error("API call failing, fallback to local randomizer");
        const random = Math.floor(Math.random() * 6) + 1; // fallback
        rollDice(random);

    }
}



const rollDice = random => {
    // reset animation so it can retrigger
    dice.style.animation = 'none';
    void dice.offsetWidth; // force reflow

    dice.style.animation = 'rolling 4s ease';

    setTimeout(() => {

        switch (random) {
            case 1:
                dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
                break;

            case 6: 
                dice.style.transform = 'rotateX(180deg) rotateY(0deg)';
                break;

            case 2:
                dice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
                break;   
                
            case 5:
                dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
                break;      

            case 3:
                dice.style.transform = 'rotateX(0deg) rotateY(90deg)';
                break;      

            case 4:
                dice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
                break;   
                
            default:
                break;
        }

        dice.style.animation = 'none'
    }, 4000);

}

if (rollBtn) {
    rollBtn.addEventListener('click', randomDice);
}