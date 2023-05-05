import './Carousel.css';
export default function Carousel(){
    return (
        <div>
            <div id="demo" class="carousel slide" data-bs-ride="carousel">

            <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="images/akwarium_background.png" alt="akwarium" class="d-block w-100"/>
            </div>
            <div class="carousel-caption margin-custom">
                <h1 class=" text-dark">Nasze motto to</h1>
                <p class="text-dark">"Twoje akwarium, Twoja oaza spokoju - z nami możesz mieć pewność, że zawsze będzie w doskonałym stanie!"</p>
            </div>
            </div>
            </div>
        </div>
    );
}