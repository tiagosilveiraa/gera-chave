class CalcChaveNE {
  chave_anterior;
  chave_nova;
  chave_nova_com_dv;

  constructor(chave_anterior) {
    this.chave_anterior = chave_anterior
    this.gerarChaveNovaSemDV();
  }

  gerarChaveNovaSemDV() {
    let numeroNovo = String(Number(this.chave_anterior.slice(25, 34)) + 1).padStart(9, '0')
    this.chave_nova = this.chave_anterior.slice(0, 25) + numeroNovo + this.chave_anterior.slice(34, 43)
  }

  getChaveNova() {
    let chave_nova_reversa = this.chave_nova.split("").reverse().join("");
    let multiplicador = 2
    let arrayProdutoMult = [];
    let digitoVerificador;
    let somatorioDosNumeros;
    for (let posChave = 0; posChave < chave_nova_reversa.length; posChave++) {
      arrayProdutoMult.push(chave_nova_reversa[posChave] * multiplicador)
      if (multiplicador < 9) {
        multiplicador++
      } else if (multiplicador >= 9) {
        multiplicador = 2
      }
    }
    somatorioDosNumeros = this.getSomatorio(arrayProdutoMult);
    digitoVerificador = (somatorioDosNumeros % 11 == 0) ? 0 : 11 - (somatorioDosNumeros % 11);
    return String(this.chave_nova + digitoVerificador);
  }

  getSomatorio(resultados) {
    return resultados.reduce((a, b) => a + b, 0)
  }

}

function gerarChave() {
  if ($('#chave_informada').val().length < 44) {
    alert("Chave de acesso inválida")
  } else {
    $('#chave_gerada').html(new CalcChaveNE($('#chave_informada').val()).getChaveNova());
    $('#resultado1').show();
  }

}