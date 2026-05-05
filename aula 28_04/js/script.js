var media = parseInt(prompt("Digite sua média: "));
var nome=prompt("Digite seu nome: ");
console.log(typeof media);
console.log(typeof nome);

if(media>7){
    console.log(nome, "Aprovado!");
}
else if(isNaN(media)){
    console.log(nome, "Não é um número");
}
else if((media>5) && (media<=7)){
    console.log(nome, "Recuperação");
}
else{
    console.log(nome, "Reprovado");
}