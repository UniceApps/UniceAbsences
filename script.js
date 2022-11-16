window.jsPDF = window.jspdf.jsPDF;
var doc = new jsPDF();
var signatureURI = "";

function generatePDF() {
    // Variables
    var ajd = new Date();
    var ajddate = ajd.getDate() + "/" + (ajd.getMonth() + 1) + "/" + ajd.getFullYear();
    var nom = document.getElementById("nom").value;
    var prenom = document.getElementById("prenom").value;
    var groupe = document.getElementById("groupe").value;
    var jour = document.getElementById("jour").value;
    var abs = document.getElementById("date").value;
    var absdate = "";
    if(abs) {
        abs.split("-")[2] + "/" + abs.split("-")[1] + "/" + abs.split("-")[0];
    }

    var motif = document.getElementById("motif").value;

    // PDF
    // Entête
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text("I.U.T NICE - COTE D'AZUR", 20, 20);
    doc.text("G.E.I.I", 160, 20);
    doc.text("A B S E N C E", 90, 25);

    // Infos étudiant
    doc.text(20, 35, "Nom, Prénom de l'étudiant : " + nom + " " + prenom);
    doc.text(20, 40, "Groupe: " + groupe);

    // Infos absence
    doc.addImage("tableau.png", "PNG", 20, 45, 160, 50);

    // Infos date + horaires + type
    switch (jour) {
        case "lundi":
            doc.text(70, 60, absdate);
            getHoraires(60);
            getType(60);
            break;
        case "mardi":
            doc.text(70, 65, absdate);
            getHoraires(65);
            getType(65);
            break;
        case "mercredi":
            doc.text(70, 72, absdate);
            getHoraires(72);
            getType(72);
            break;
        case "jeudi":
            doc.text(70, 77, absdate);
            getHoraires(77);
            getType(77);
            break;
        case "vendredi":
            doc.text(70, 82, absdate);
            getHoraires(82);
            getType(82);
            break;
        case "ds":
            doc.text(70, 87, absdate);
            getHoraires(87);  
            getType(87);
            break;
    }

    // Infos motif
    doc.setFont(undefined, 'normal');
    doc.text(20, 105, "Motif : " + motif);
    doc.setFontSize(30);
    doc.text(".", 20, 110);

    // Infos date + signature
    doc.setFontSize(12);
    doc.text("Pièce justificative ci-jointe", 20, 120);
    doc.text(20, 125, "Date : Le " + ajddate);
    doc.text("Signature : ", 150, 125);
    if(signatureURI) {
        doc.addImage(signatureURI, "PNG", 170, 120);
    }

    // Pied de page
    doc.setFontSize(10);
    doc.text("* Passé le délai maximum de 5 jours ouvrés à partir du 1er jour d'absence, aucune justification ne", 20, 140);
    doc.text("pourra être acceptée et l'absence sera considerée de fait, comme non justifiée.", 20, 145);

    doc.setLineWidth(0.5);
    doc.line(20, 155, 180, 155);
}

function resetForm() {
    document.getElementById("infos").reset();
}

function downloadPDF() {
    generatePDF();
    doc.save('Absence.pdf');
}

function printPDF() {
    generatePDF();
    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');
}

// Obtenir horaires
function getHoraires(y) {
    getHorairesMatin(y);
    getHorairesApresmidi(y);
}

function getHorairesMatin(y) {
    if (document.getElementById("matin").checked) {
        doc.text(150, y, "X");
    }
}

function getHorairesApresmidi(y) {
    if (document.getElementById("apresmidi").checked) {
        doc.text(170, y, "X");
    }
}

// Obtenir type de cours
function getType(y) {
    getTypeTD(y);
    getTypeTP(y);
    getTypeER(y);
}

function getTypeTD(y) {
    if(document.getElementById("tp").checked) {
        doc.text(115, y, "X");
    }
}

function getTypeTP(y) {
    if(document.getElementById("td").checked) {
        doc.text(125, y, "X");
    }
}

function getTypeER(y) {
    if(document.getElementById("er").checked) {
        doc.text(135, y, "X");
    }
}

// Convertit la signature en URI base64
document.querySelector('#signature').onchange = function(){
    var reader = new FileReader();
    reader.onloadend = function () {
      signatureURI = reader.result;
      console.log(signatureURI);
    }
    reader.readAsDataURL(this.files[0]);
  };