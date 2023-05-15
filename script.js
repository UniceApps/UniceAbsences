window.jsPDF = window.jspdf.jsPDF;
var doc = new jsPDF();
var signatureURI = "";
var nbDates = 1;

function generatePDF() {
    // Variables
    var ajd = new Date();
    var ajddate = ajd.getDate() + "/" + (ajd.getMonth() + 1) + "/" + ajd.getFullYear();
    var nom = document.getElementById("nom").value;
    var prenom = document.getElementById("prenom").value;
    var groupe = document.getElementById("groupe").value;
    
    var jourInputs = document.getElementsByClassName("jour");
    var dateInputs = document.getElementsByClassName("date");
    var apresmidiInputs = document.getElementsByClassName("apresmidi");
    var matinInputs = document.getElementsByClassName("matin");
    var tpInputs = document.getElementsByClassName("tp");
    var tdInputs = document.getElementsByClassName("td");
    var erInputs = document.getElementsByClassName("er");
    
    var jourValues = [];
    var dateValues = [];
    var apresmidiValues = [];
    var matinValues = [];
    var tpValues = [];
    var tdValues = [];
    var erValues = [];
    
    for (var i = 0; i < jourInputs.length; i++) {
        jourValues.push(jourInputs[i].value);
        dateValues.push(dateInputs[i].value);
        apresmidiValues.push(apresmidiInputs[i].checked);
        matinValues.push(matinInputs[i].checked);
        tpValues.push(tpInputs[i].checked);
        tdValues.push(tdInputs[i].checked);
        erValues.push(erInputs[i].checked);
    }

    var motif = document.getElementById("motif").value;

    // PDF
    // Entête
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text("I.U.T NICE - COTE D'AZUR", 20, 20);
    doc.text("A B S E N C E", 90, 25);

    // Infos étudiant
    doc.text(20, 35, "Nom, Prénom de l'étudiant : " + nom + " " + prenom);
    doc.text(20, 40, "Groupe: " + groupe);

    // Infos absence
    doc.addImage("tableau.png", "PNG", 20, 45, 160, 50);

    // Infos date + horaires + type
    for (var i = 0; i < jourInputs.length; i++) {
        var jour = jourValues[i];
        var abs = dateValues[i];
        var apresmidi = apresmidiValues[i];
        var matin = matinValues[i];
        var tp = tpValues[i];
        var td = tdValues[i];
        var er = erValues[i];
        var absdate = "";

        console.log(jour, abs, matin, apresmidi, td, tp, er);

        if(abs) {
            absdate = abs.split("-")[2] + "/" + abs.split("-")[1] + "/" + abs.split("-")[0];
        }

        switch (jour) {
            case "lundi":
                doc.text(70, 60, absdate);
                getHoraires(60, matin, apresmidi);
                getType(60, td, tp, er);
                break;
            case "mardi":
                doc.text(70, 65, absdate);
                getHoraires(65, matin, apresmidi);
                getType(65, td, tp, er);
                break;
            case "mercredi":
                doc.text(70, 72, absdate);
                getHoraires(72, matin, apresmidi);
                getType(72, td, tp, er);
                break;
            case "jeudi":
                doc.text(70, 77, absdate);
                getHoraires(77, matin, apresmidi);
                getType(77, td, tp, er);
                break;
            case "vendredi":
                doc.text(70, 82, absdate);
                getHoraires(82, matin, apresmidi);
                getType(82, td, tp, er);
                break;
            case "ds":
                doc.text(70, 87, absdate);
                getHoraires(87, matin, apresmidi);  
                getType(87, td, tp, er);
                break;
        }
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
function getHoraires(y, matin, apresmidi) {
    if (matin == true) {
        getHorairesMatin(y);
    }
    if (apresmidi == true) {
        getHorairesApresmidi(y);
    }
}

function getHorairesMatin(y) {
        doc.text(150, y, "X");
}

function getHorairesApresmidi(y) {
        doc.text(170, y, "X");
}

// Obtenir type de cours
function getType(y, td, tp, er) {
    if (td == true) {
        getTypeTD(y);
    }
    if (tp == true) {
        getTypeTP(y);
    }
    if (er == true) {
        getTypeER(y);
    }
}

function getTypeTD(y, i) {
    doc.text(115, y, "X");
}

function getTypeTP(y, i) {
    doc.text(125, y, "X");
}

function getTypeER(y, i) {
    doc.text(135, y, "X");
}

function addDate() {
    // add input field on html
    var code = `
    <select required="" class="jour" id="jour" name="jour" class="input">
        <option value="lundi">Lundi</option>
        <option value="mardi">Mardi</option>
        <option value="mercredi">Mercredi</option>
        <option value="jeudi">Jeudi</option>
        <option value="vendredi">Vendredi</option>
        <option value="ds">DS</option>
    </select>
    <input required="" class="date" type="date" id="date" name="date" class="input">
    <label>| Matin</label>
    <input type="checkbox" class="matin" id="matin" value="Matin">
    <label>| Après-Midi</label>
    <input type="checkbox" class="apresmidi" id="apresmidi" value="ApresMidi">
    <label>| TD</label>
    <input type="checkbox" class="td" id="td" value="TD">
    <label>| TP</label>
    <input type="checkbox" class="tp" id="tp" value="TP">
    <label>| ER</label>
    <input type="checkbox" class="er" id="er" value="ER">
    <input type="button" class="remove" value="X" onclick="removeDate()">
    <hr>
    `;
    var div = document.getElementById("dates");
    if (nbDates < 6) {
        div.appendChild(document.createElement('div')).innerHTML = code;
        nbDates++;
    }
}

function removeDate() {
    var div = document.getElementById("dates");
    if (nbDates > 1) {
        div.removeChild(div.lastChild);
        nbDates--;
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