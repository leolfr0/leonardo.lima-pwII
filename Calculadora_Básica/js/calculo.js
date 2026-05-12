var n1 = document.querySelector("#n1");
var n2 = document.querySelector("#n2");
var resultado = document.querySelector("#resultado");
var select = document.getElementById("opcoes");

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

function areaTriangulo(){
    if(Number(n1.value)==0 || Number(n2.value)==0){
        resultado.innerHTML="Erro: não é possível fazer área por 0";
    }
    else{
        resultado.innerHTML=(Number(n1.value)*Number(n2.value))/2;
    }
}

function areaQuadrado(){
    if (Number(n1.value)==0){
        resultado.innerHTML="Erro: não é possível fazer área por 0";
    }
    else{
        resultado.innerHTML=Number(n1.value)*Number(n1.value);
    }
}

function parImpar(){
    if (Number(n1.value)%2==0){
        resultado.innerHTML="O número é par";
    }
    else{
        resultado.innerHTML="O número é ímpar";
    }
}

function menos10Porcento(){
    n1.value-=Number(n1.value)*0.1
    resultado.innerHTML=n1.value;
}

function menos3Porcento(){
    resultado.innerHTML=n1.value-=Number(n1.value)*0.03;
}

function lucro15Porcento(){
    n1.value=Number(n1.value)+(Number(n1.value)*0.15);
    resultado.innerHTML=n1.value;
}

function venda(){
    if(Number(n1.value)>1000){
        n1.value-=Number(n1.value*0.07);
        resultado.innerHTML=n1.value;
    }
    else if(Number(n1.value)<200){
        resultado.innerHTML="Boa compra!";
    }
    else if(Number(n1.value)<=500){
        n1.value=Number(n1.value)+(Number(n1.value)*0.05);
        resultado.innerHTML=n1.value;
    }
}

var idade=prompt("Insira sua idade.");
if (idade<18){
    console.log("Menor de idade");
}
else{
    console.log("Maior de idade");
}