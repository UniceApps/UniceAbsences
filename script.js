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
    var absdate = abs.split("-")[2] + "/" + abs.split("-")[1] + "/" + abs.split("-")[0];
    var type;
    if (document.getElementById("tp").checked) {
        type = type + "tp";
    } else if (document.getElementById("td").checked) {
        type = type + "td";
    } else if (document.getElementById("er").checked) {
        type = type + "er";
    }
    var horaires;
    if (document.getElementById("matin").checked) 
    {
        horaires = "matin";
    } 
    else if (document.getElementById("apresmidi").checked) 
    {
        horaires = "amidi";
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
            getHoraires(horaires, 60);
            getType(type, 60);
            break;
        case "mardi":
            doc.text(70, 65, absdate);
            getHoraires(horaires, 65);
            getType(type, 65);
            break;
        case "mercredi":
            doc.text(70, 72, absdate);
            getHoraires(horaires, 72);
            getType(type, 72);
            break;
        case "jeudi":
            doc.text(70, 77, absdate);
            getHoraires(horaires, 77);
            getType(type, 77);
            break;
        case "vendredi":
            doc.text(70, 82, absdate);
            getHoraires(horaires, 82);
            getType(type, 82);
            break;
        case "ds":
            doc.text(70, 87, absdate);
            getHoraires(horaires, 87);  
            getType(type, 87);
            break;
    }

    doc.setFont(undefined, 'normal');
    doc.text(20, 105, "Motif : " + motif);
    doc.setFontSize(30);
    doc.text(".", 20, 110);

    doc.setFontSize(12);
    doc.text("Pièce justificative ci-jointe", 20, 120);
    doc.text(20, 125, "Date : Le " + ajddate);
    doc.text("Signature : ", 150, 125);
    if(signatureURI) {
        doc.addImage(signatureURI, "PNG", 170, 120);
    }

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

function getHoraires(horaires, y) {
    switch (horaires) {
        case "matin":
            doc.text(150, y, "X");
            break;
        case "amidi":
            doc.text(170, y, "X");
            break;
    }
}

function getType(type, y) {
    if(type == "td") {
        doc.text(110, y, "X");
    } else if(type == "tp") {
        doc.text(120, y, "X");
    } else if(type == "er") {
        doc.text(130, y, "X");
    }
}   

document.querySelector('#signature').onchange = function(){
    var reader = new FileReader();
    reader.onloadend = function () {
      signatureURI = reader.result;
      console.log(signatureURI);
    }
    reader.readAsDataURL(this.files[0]);
  };