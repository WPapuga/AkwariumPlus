import '../pages/Home.css';
export default function BenefitsDescription(){
    return (
<div class="row text-center p-3 width-100">
      <h1 class="mb-4">Co oferuje nasza strona?</h1>
      <div class="col-lg-4 container ">
        <img src="images/free-access.png" alt="Free" class="mb-3" width="140" height="140"/>
        <h2 class="fw-normal mb-3">Darmowy dostep</h2>
        <p>Dostaniesz darmowy dostep do wielu funkcjonalnosci na stronie.</p>
      </div>
      <div class="col-lg-4">
        <img src="images/fish-tank.png" alt="Free" class="mb-3" width="140" height="140"/>
        <h2 class="fw-normal mb-3">Zarzadaj swoim akwarium</h2>
        <p>Bedziesz w stanie dowolnie zarzadzac swoim akwarium.</p>
      </div>
      <div class="col-lg-4">
        <img src="images/fish.png" alt="Free" class="mb-3" width="140" height="140"/>
        <h2 class="fw-normal mb-3">Dbaj o swoje ryby</h2>
        <p>Mozesz sprawdzic czy gatunki danych ryb ze soba coegzystuja lub czy moga jesc dane konkretne pokarmy.</p>
      </div>
    </div>

    );
}