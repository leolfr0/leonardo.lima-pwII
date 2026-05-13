var n1 = document.querySelector("#n1");
var n2 = document.querySelector("#n2");
var resultado = document.querySelector("#resultado");
var select = document.getElementById("opcoes");
var btnSomar = document.getElementById("somar");
var btnSubtrair = document.getElementById("subtrair");
var btnMultiplicar = document.getElementById("multiplicar");
var btnDividir = document.getElementById("multiplicar");
var btnParImpar = document.getElementById("parImpar");
var btnAreaTriangulo = document.getElementById("areaTriangulo");
var btnAreaQuadrado = document.getElementById("areaQuadrado");
var btn10Porcento = document.getElementById("menos10Porcento");
var btn3Porcento = document.getElementById("menos3Porcento");
var btn15Porcento = document.getElementById("lucro15Porcento");
var btnVenda = document.getElementById("venda");

select.addEventListener("change", function () {
    btnSomar.style.display="none";
    btnSubtrair.style.display="none";
    btnMultiplicar.style.display="none";
    btnDividir.style.display="none";
    btnParImpar.style.display="none";
    btnAreaTriangulo.style.display="none";
    btnAreaQuadrado.style.display="none";
    btn10Porcento.style.display="none";
    btn3Porcento.style.display="none";
    btn15Porcento.style.display="none";
    btnVenda.style.display="none";

    if (select.value==="operacoesBasicas"){
        btnSomar.style.display="inline-block";
        btnSubtrair.style.display="inline-block";
        btnMultiplicar.style.display="inline-block";
        btnDividir.style.display="inline-block";
        btnParImpar.style.display="inline-block";
    }

    if (select.value==="area"){
        btnAreaTriangulo.style.display="inline-block";
        btnAreaQuadrado.style.display="inline-block";
    }

    if (select.value==="venda"){
        btn10Porcento.style.display="inline-block";
        btn3Porcento.style.display="inline-block";
        btn15Porcento.style.display="inline-block";
        btnVenda.style.display="inline-block";
    }
})

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