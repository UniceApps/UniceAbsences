window.jsPDF = window.jspdf.jsPDF;
var doc = new jsPDF();
var signatureURI = "";

function generatePDF() {
    var nom = document.getElementById("nom").value;
    var prenom = document.getElementById("prenom").value;
    var groupe = document.getElementById("groupe").value;
    //var jour = document.getElementById("jour").value;
    var date = document.getElementById("date").value;
    //var type = document.getElementById("type").value;
    //var matin = document.getElementById("matin").value;
    //var apresmidi = document.getElementById("apresmidi").value;
    var motif = document.getElementById("motif").value;

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text("I.U.T NICE - COTE D'AZUR", 20, 20);
    doc.text("G.E.I.I", 160, 20);
    doc.text("A B S E N C E", 90, 25);

    doc.text(20, 35, "Nom, Prénom de l'étudiant : " + nom + " " + prenom);
    doc.text(20, 40, "Groupe: " + groupe);

    doc.addImage("tableau.png", "PNG", 20, 45, 160, 50);



    doc.setFont(undefined, 'normal');
    doc.text("Motif:", 20, 105);
    doc.setFontSize(30);
    doc.text(".", 20, 110);

    doc.setFontSize(12);
    doc.text("Pièce justificative ci-jointe", 20, 120);
    doc.text(20, 125, "Date : Le " + date);
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

document.querySelector('#signature').onchange = function(){
    var reader = new FileReader();
    reader.onloadend = function () {
      signatureURI = reader.result;
      console.log(signatureURI);
    }
    reader.readAsDataURL(this.files[0]);
  };