var n1 = document.querySelector("#n1");
var n2 = document.querySelector("#n2");
var resultado = document.querySelector("#resultado");

function somar() {
    resultado.innerHTML = Number(n1.value)+Number(n2.value);
}

function subtrair() {
    resultado.innerHTML=Number(n1.value)-Number(n2.value);
}

function multiplicar() {
    resultado.innerHTML=Number(n1.value)*Number(n2.value);
}

function dividir() {
    if(Number(n2.value)==0){
        resultado.innerHTML="Erro: divisão por 0";
    }
    else{
        resultado.innerHTML=Number(n1.value)/Number(n2.value);
    }
}

function AreaTriangulo(){
    if(n1.value==0 || n2.value==0){
        resultado.innerHTML="Erro: não é possível fazer área por 0";
    }
    else{
        resultado.innerHTML=(n1.value*n2.value)/2;
    }
}

function AreaQuadrado(){
    if (n1.value==0){
        resultado.innerHTML="Erro: não é possível fazer área por 0"
    }
    else{
        resultado.innerHTML=n1.value*n1.value;
    }
}

var idade=prompt("Insira sua idade.");
if (idade<18){
    console.log("Menor de idade");
}
else{
    console.log("Maior de idade");
}