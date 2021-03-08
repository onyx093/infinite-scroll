const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
//let initialLoad = true;

// Unsplash API
let count = 5;
const API_key = 'sYc7c7uAlCatY8fBtJewDu_FC2LRcSSpZYD0i0DNy_c';
const unsplashAPI_URL = `https://api.unsplash.com/photos/random/?client_id=${API_key}&count=${count}`;

function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

//Check if all images are loaded
function imageLoaded(){
    console.log("Image loaded");
    imagesLoaded += 1;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.style.visibility = 'hidden';
        //initialLoad = false;
        count = 30;
    }
}

// Create elements for links and photos, and add to the DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('Total images: ', totalImages);
    // Run function for each object in photoArray
    photosArray.forEach( photo => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
        });
        if(photo.alt_description != null){
            setAttributes(img, {
                alt: photo.alt_description,
                title: photo.alt_description,
            });
        }

        //Check when each image has finished loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put <a> tag inside the imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get photos from Unsplash API
async function getPhotos(){
    try {
        const response = await fetch(unsplashAPI_URL);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch error here
    }
}

// Check to see if scrolling is near bottom of the page, then load more photos
window.addEventListener('scroll', () => {
    if((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 1000) && ready){
        /* console.log('window.innerHeight:' , window.innerHeight);
        console.log('window.scrollY:' , window.scrollY);
        console.log('window.innerHeight + scrollY:' , window.innerHeight + window.scrollY);
        console.log('document.body.offsetHeight - 450:' , document.body.offsetHeight - 450); */
        ready = false;
        getPhotos();
    }
});

//On Load
getPhotos();