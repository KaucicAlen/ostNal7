let uraDanasnja = setInterval(prikaziUro, 1000)
let uraPreostala = setInterval(preostaliCas, 1000);
let kosarica = new Array();
let izdelki = new Array();
let prijavljeniUporabniki = new Array();
let uporabnik = new Array();

function prikaziUro() {
    let d = new Date();
    let nekaj = document.getElementById("ura");
    nekaj.innerHTML = d.toLocaleTimeString();

}

async function preostaliCas() {
    let d, h, m, s;
    let a = new Date("2021-03-23")
    let b = new Date();
    let ms1 = Date.parse(a);
    let ms2 = Date.parse(b);
    let ms = ms1 - ms2;

    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    
    document.getElementById("odstevanje").innerHTML = d + " DNI " + h + " UR " + m + " MINUT " + s + " SEKUND";
 }


 async function validate() {

     const ime = document.forms["kontaktnaVloga"]["ime"].value;
     const priimek = document.forms["kontaktnaVloga"]["priimek"].value;
     const mail = document.forms["kontaktnaVloga"]["email"].value;
     
     if(ime == ""){
         alert("Polje ime nesme ostati prazno");
         return false;
     }
     if(priimek == ""){
        alert("Polje priimek nesme ostati prazno");
        return false;
    }
    if(mail == ""){
        alert("Polje email nesme ostati prazno");
        return false;
    }
    
     return true;
 }

 async function getPrice(){
     const normalnaNarocnina = document.getElementById("normal").checked;
     const vipNarocnina = document.getElementById("vip").checked;
     const superVipNarocnina = document.getElementById("supervip").checked;
     const casNarocnine = document.getElementById("casNarocnine").value;
     let skupnaCena;
     let normalnaCena = 10;
     let vipCena = 15;
     let superVipCena = 20;

     if(normalnaNarocnina == true){
         skupnaCena = casNarocnine * normalnaCena;
         document.getElementById("skupnaCena").innerHTML ="Vaša mesečna naročnina bo: " + normalnaCena + "€ oziroma " + skupnaCena + "€ skozi " + " pretečen čas";
       
        }
     if(vipNarocnina == true){
        skupnaCena = casNarocnine * vipCena;
        document.getElementById("skupnaCena").innerHTML ="Vaša mesečna naročnina bo: " + vipCena + "€ oziroma " + skupnaCena + "€ skozi " +  " pretečen čas";
        
    }
    if(superVipNarocnina == true){
        skupnaCena = casNarocnine * superVipCena;
        document.getElementById("skupnaCena").innerHTML ="Vaša mesečna naročnina bo: " + superVipCena + "€ oziroma " + skupnaCena + "€ skozi " +  " pretečen čas";    
       
    }
 }

 async function validateNarocnina() {
     const kolicina = document.getElementById("casNarocnine").value;
     const normalnaNarocnina = document.getElementById("normal").checked;
     const vipNarocnina = document.getElementById("vip").checked;
     const superVipNarocnina = document.getElementById("supervip").checked;

     if(normalnaNarocnina == "" && vipNarocnina == "" && superVipNarocnina == ""){
         alert("Prosim izberite tip naročnine!");
         return false;
     }

     if(kolicina == "" || kolicina == 0){
         alert("Prosim vnesite čas naročnine!");
         return false;
     }
     if(kolicina < 0){
        alert("Čas naročnine nemore biti negativen!");
        return false;
    }
     return true;
 }


  async function nastaviCene() {
    kosarica = (JSON.parse(sessionStorage.getItem("kosarica")) || []);

    let skupnaCena = 0.00;
    let skupajDDV = 0.00;

    

    for(let i = 0; i < kosarica.length; i++){
        skupnaCena = skupnaCena + (kosarica[i].cena - (kosarica[i].cena * kosarica[i].popust));
    }

    for(let j = 0; j < kosarica.length; j++){
        let davek = (kosarica[j].cena - (kosarica[j].cena * kosarica[j].popust)) * 0.22;
        let cenaDDV = (kosarica[j].cena - (kosarica[j].cena * kosarica[j].popust)) + davek;
        skupajDDV = skupajDDV + cenaDDV; 
    }




   skupajDDV = skupajDDV.toFixed(2);

    document.getElementById("skupnaCena").innerHTML = skupnaCena + " €";
    document.getElementById("skupnaDDV").innerHTML = skupajDDV + " €";


     
 }
 


function validateDodajIzdelek() {
    const ime = document.getElementById("imeIzdelka").value;
    const cena = document.getElementById("cenaIzdelka").value;
    const velikost1 = document.getElementById("velikostIzdelka1").checked;
    const velikost2 = document.getElementById("velikostIzdelka2").checked;
    const velikost3 = document.getElementById("velikostIzdelka3").checked;
    const opis = document.getElementById("opisIzdelka").value;
    
     
     if(ime == ""){
         alert("Prosim vnesite ime izdelka.");
         return false;
     }
     if(cena == "" || cena < 0){
        alert("Prosim vnesite ceno izdelka.");
        return false;
    }
    if(velikost1 == false){
       if(velikost2 == false){
           if(velikost3 == false){
               alert("Prosim vnesite velikost izdelka.")
               return false;
           }
       }
    }
   
   
    if(opis == ""){
        alert("Prosim vnesite opis izdelka.");
        return false;
    }
     return true;
 }

 async function dodajNovIzdelek() {
     const produkt = new Object();
     produkt.ime = document.getElementById("imeIzdelka").value;
     produkt.cena = document.getElementById("cenaIzdelka").value;
     produkt.velikost = document.getElementById("velikostIzdelka1").value;
     produkt.opis = document.getElementById("opisIzdelka").value;
    
     izdelki.push(produkt); 
     console.log(izdelki);
     localStorage.setItem("noviIzdelki", JSON.stringify(izdelki));  
 }

async function prikaziIzdelke(){
     fetch('http://localhost:3000/izdelki', {method: "GET"})
    .then((odgovor) => {
        return odgovor.json();
    })
    .then((izdelki) =>{

    const tabela = document.getElementById("tabela-izdelkov");
    for (const izdelek of izdelki) {
        let vrstica = tabela.insertRow(-1);
        let naziv = vrstica.insertCell(-1);
        naziv.innerHTML = izdelek.naziv;
        let velikost = vrstica.insertCell(-1);
        velikost.innerHTML = izdelek.velikost;
        let cena = vrstica.insertCell(-1);
        cena.innerHTML = izdelek.cena + "€";
        let popust = vrstica.insertCell(-1);
        popust.innerHTML = (izdelek.popust * 100) + "%";
        let slika = vrstica.insertCell(-1);
        slika.innerHTML = "<img src='" + izdelek.src + "' width=\"150px\" height=\"150px\">";
        let dodaj = vrstica.insertCell(-1);
        dodaj.innerHTML = "<button class='btn btn-secondary btnMoj' onclick='dodajIzdelek(" + JSON.stringify(izdelek) + ")'>Dodaj v košarico</button>";
    };
});

};

async function dodajIzdelek(izdelek) {
    let kosarica = (JSON.parse(sessionStorage.getItem("kosarica")) || []);
    kosarica.push(izdelek);
    console.log(kosarica);
    sessionStorage.setItem("kosarica", JSON.stringify(kosarica));
}



async function narediKosarico() {
 let kosarica = (JSON.parse(sessionStorage.getItem("kosarica")) || []);    
 const tabela = document.getElementById("tabela-kosarica");
 let skupnaCena = 0;
 for (const [index, izdelek] of kosarica.entries()){
    let znesek = parseFloat(izdelek.cena) - izdelek.popust / 100 * izdelek.cena;
    skupnaCena += parseFloat(izdelek.cena);
    let vrstica = tabela.insertRow(-1);
    let naziv = vrstica.insertCell(-1);
    naziv.innerHTML = izdelek.naziv;
    let kolicina = vrstica.insertCell(-1);
    kolicina.innerHTML = "<input type='number' id='kolicinaIzdelkov' value='1' min='1' style='width: 50px;'></input>"
    let cena = vrstica.insertCell(-1);
    cena.innerHTML = (izdelek.cena - (izdelek.cena * izdelek.popust))  + "€";
    let odstrani = vrstica.insertCell(-1); 
    odstrani.innerHTML = "<button class='btn btn-close btnMoj' onclick='odstraniIzKosarice(" + index + ")'>Odstrani iz košarice</button>";
 }

}

async function odstraniIzKosarice(index){
    let kosarica = (JSON.parse(sessionStorage.getItem("kosarica")) || []);
    kosarica.splice(index, 1);
    sessionStorage.setItem("kosarica", JSON.stringify(kosarica));
    location.reload();


}


async function nastaviObrok(){

    kosarica = (JSON.parse(sessionStorage.getItem("kosarica")) || []);

    let skupnaCena = 0.00;
    let skupajDDV = 0.00;
    let n = prompt("Koliko mesecev bi radi plačevali", "1");
    

    for(let i = 0; i < kosarica.length; i++){
        skupnaCena = skupnaCena + (kosarica[i].cena - (kosarica[i].cena * kosarica[i].popust));
    }

    for(let j = 0; j < kosarica.length; j++){
        let davek = (kosarica[j].cena - (kosarica[j].cena * kosarica[j].popust)) * 0.22;
        let cenaDDV = (kosarica[j].cena - (kosarica[j].cena * kosarica[j].popust)) + davek;
        skupajDDV = skupajDDV + cenaDDV; 
    }




   skupajDDV = skupajDDV.toFixed(2);
   skupajObrok = skupajDDV / n;
   skupajObrok = skupajObrok.toFixed(2);


    document.getElementById("skupnaCena").innerHTML = skupnaCena + " €";
    document.getElementById("skupnaDDV").innerHTML = skupajDDV + " €";
    document.getElementById("skupnaObrok").innerHTML = skupajObrok + " €/mesec";


     
}


async function prijava(){

    let ime = document.getElementById("uporabniskoIme").value;
    let geslo = document.getElementById("vnesenoGeslo").value;

    fetch('http://localhost:3000/uporabniki', {
        method: "GET",
    })
    .then((odgovor) => {
        return odgovor.json();
    })
    .then((uporabniki) => {
        for(let i = 0; i < uporabniki.length; i++){
            if(uporabniki[i].uIme === ime){
                if(uporabniki[i].uGeslo === geslo){
                    let id = uporabniki[i].id;
                    uporabnik.pop();
                    uporabnik.push(id);
                    sessionStorage.test = id;
                    console.log("Uporabnik najden in id: " + id + " dodan v session storage")
                    break;
                }
            }else{
                console.log("Napacen vnos")
            }
        }
        
    })

   

}


function registrirajUporabnika(){
    event.preventDefault();
    obrazec = document.getElementById('registracijskaVloga');
    const data = new URLSearchParams(new FormData(obrazec));


    fetch('http://localhost:3000/uporabniki/', {
        method: "POST", body: data
    })
    .then((odgovor) => {
        return odgovor.json();
    })
    .then((uporabniki) => {
        
    })
    
};

function kupi(){
    let id = sessionStorage.getItem("test");
    let nakup = (JSON.parse(sessionStorage.getItem("kosarica")) || []);
    let datumNakupa = new Date();
    let skupniZnesek = 0;
    for(let i = 0; i < nakup.length; i++){
        skupniZnesek += parseFloat((nakup[i].cena - (nakup[i].cena * nakup[i].popust)) + (nakup[i].cena - (nakup[i].cena * nakup[i].popust)) * 0.22);    
    }
    
    console.log("Uporabnik z ID: " + id + " je kupil: " + JSON.stringify(nakup) + ". Skupni znesek: " + skupniZnesek + "€ datum nakupa: " + datumNakupa);

    let novNakup = {
        idUporabnika: id,
        nakup: nakup,
        datumNakupa: datumNakupa,
        skupniZnesek: skupniZnesek
    };


    fetch('http://localhost:3000/nakupi', {
        method: "POST", body: novNakup
    }).then((odgovor) => {
        return odgovor.json();
    })
    .then((nakup) => {
        
    })

};