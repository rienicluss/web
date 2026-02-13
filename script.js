const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const iceBear = document.getElementById("iceBear");
const yesMusic = document.getElementById("yesMusic");

// Ice Bear stickers
const bearImages = ["1.png","2.png","4.png"];

// Run-away "No" button
function runAway(e) {
    const rect = noBtn.getBoundingClientRect();
    const btnWidth = rect.width;
    const btnHeight = rect.height;

    let deltaX = rect.left + btnWidth/2 - e.clientX;
    let deltaY = rect.top + btnHeight/2 - e.clientY;

    let offset = 100;
    let newX = rect.left + deltaX*1.5 + (Math.random()-0.5)*offset;
    let newY = rect.top + deltaY*1.5 + (Math.random()-0.5)*offset;

    newX = Math.min(Math.max(0,newX), window.innerWidth - btnWidth);
    newY = Math.min(Math.max(0,newY), window.innerHeight - btnHeight);

    noBtn.style.left = newX + "px";
    noBtn.style.top = newY + "px";

    // Change Ice Bear
    iceBear.src = bearImages[Math.floor(Math.random()*bearImages.length)];
}
noBtn.addEventListener("mousemove", runAway);

// Yes button click: play music, then navigate
yesBtn.addEventListener("click", () => {
    yesMusic.play().catch(() => {
        document.body.addEventListener("click", () => yesMusic.play(), { once: true });
    });

    setTimeout(() => {
        window.location.href = 'yes.html';
    }, 200); // slight delay to start music
});

// Floating hearts
function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "💗";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.fontSize = (Math.random()*20 + 10) + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 300);
