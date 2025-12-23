
/**
 * Banner Slider
 * 
 * Handles everything involving the banner on the top of the page, including making the images
 * and text shift every few seconds
 */

const TITLEINDEX = 1;
const TAGLINEINDEX = 2

const slider = document.querySelector('.banner-slider');
const bannerTitle = document.getElementById('banner-title')
const bannerTagline = document.getElementById('banner-tagline')

const bannerUrls = [
    ['assets/images/banner1.jpg','Premier Speedcubing League',"The Home of Professional Speedcubing\n\nFeaturing:\n- Head to head competition\
        \n- Open Qualifiers\n- Competitive Rating Systems"],
    ['assets/images/banner2.jpg','Our Next Events','PSL Berkeley Open\nMarch 16th, 2025\n\nPSL San Diego Open\nMarch 22nd, 2025'],
    ['assets/images/banner3.jpg','What Makes Us Special?','Compete in our open qualifiers to experience a convention-like\n speedcubing event,\
        as well as a brand new competitive format!'],
    ['assets/images/banner4.jpg','PSL Theme Song:','Skate by DG the Artist']
];
const bannerShiftSeconds = 6;

// create and append the image elements dynamically
/*
bannerUrls.forEach((banner, index) => {
    const bannerImage = document.createElement('div');
    bannerImage.className = 'banner-image';
    bannerImage.style.backgroundImage = `url(${banner[0]})`;
    if (index === 0) {
        bannerImage.classList.add('active'); // make sure page loads with visible image
        bannerTitle.innerHTML = bannerUrls[0][TITLEINDEX]
        bannerTagline.innerHTML = bannerUrls[0][TAGLINEINDEX]
    }
    slider.appendChild(bannerImage);
});


const images = document.querySelectorAll('.banner-image');
const totalImages = images.length;
let currentIndex = 0;
*/

function changeBanner() {
    //new

    //comment out to pause the scrolling banner on whatever the number below is
    //if (currentIndex == 0){
    //    return;
    //}
    bannerTitle.classList.remove('show');
    bannerTagline.classList.remove('show');

    setTimeout(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalImages;
        images[currentIndex].classList.add('active');
        
        bannerTitle.textContent = bannerUrls[currentIndex][TITLEINDEX]
        bannerTagline.textContent = bannerUrls[currentIndex][TAGLINEINDEX]

        bannerTitle.classList.add('show');
        bannerTagline.classList.add('show');
    }, 500);

}

/*
bannerTitle.classList.add('show');
bannerTagline.classList.add('show');
*/

/** 
 * Uncomment this line to re-enable the shifting banner
 * setInterval(changeBanner, bannerShiftSeconds * 1000);
 */
// Change image every 5 seconds



/**
 * Event Info Popup
 * 
 * Handles the popup that appears when you click one of the events to get more information about it
 */

const figures = document.querySelectorAll('.event-figs figure:not(.tbd-event)');

// Popup elements
const popup = document.getElementById('popup');
const popupImage = document.getElementById('popup-image');
const popupTitle = document.getElementById('popup-title');
const popupDescription = document.getElementById('popup-description');
const closeBtn = document.getElementById('close-popup');

// Content data for each event
const eventData = [
    {
        imageSrc: 'assets/images/space_needle.webp',
        title: 'PSL Michigan',
        link: 'https://www.start.gg/tournament/premier-speedcubing-league-michigan-open/details',
        description: 'Join us on February 21th, 2026 for our sixth PSL event, located in Port Huron Michigan!',
    },
    {
        imageSrc: 'assets/images/happyft_logo.png',
        title: 'The Speedcubing.tv Cup',
        link: 'pages/speedcubingtvcup.html',
        description: 'An online tournament run by our partner, Speedcubing.tv! The winner of this tournament will receive a free ticket to entry for a future PSL Event!',
    }
];

// Function to open popup
function openPopup(index) {
    const event = eventData[index];
    popupImage.src = event.imageSrc;
    popupTitle.textContent = event.title;
    popupDescription.textContent = event.description;

    const popupLink = document.getElementById('popup-link');
    const popupButton = document.getElementById('popup-button');

    if (event.link) {
        popupLink.href = event.link;
        popupLink.style.display = 'inline-block'; // Show button if link exists
    } else {
        popupLink.style.display = 'none'; // Hide button if no link
    }

    popup.style.display = 'block';
}

// Event listeners for figures
figures.forEach((figure) => {
    const img = figure.querySelector('img'); // Get the image inside the figure
    if (img) {
        img.addEventListener('click', () => {
            openPopup(Array.from(figures).indexOf(figure)); // Use the figure's index
        });
    }
});

// Close popup
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});
