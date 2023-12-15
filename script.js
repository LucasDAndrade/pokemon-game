const pokemons = {
  Bulbasaur: {type: 'Grass/Poison', hp: 50, attack: 10, defense: 5},
  Charmander: {type: 'Fire', hp: 45, attack: 12, defense: 4},
  Squirtle: {type: 'Water', hp: 48, attack: 11, defense: 6},
  Mewtwo: {type: 'Psychic', hp: 60, attack: 20, defense: 10},
};

let pokemonEscolhido = '';
let hpJogador = 50;

function escolherPokemon(pokemon) {
  pokemonEscolhido = pokemon;
  exibirAtributos();
}

function exibirAtributos() {
  const pokemon = pokemons[pokemonEscolhido];
  alert(`Atributos do ${pokemonEscolhido}:\n\nType: ${pokemon.type}\nHP: ${pokemon.hp}\nAttack: ${pokemon.attack}\nDefense: ${pokemon.defense}`);
  confirmarTroca();
}

function confirmarTroca() {
  const resposta = confirm('Deseja trocar de Pokémon?');
  if (resposta) {
    escolherPokemon(prompt('Escolha outro Pokémon (Bulbasaur, Charmander ou Squirtle):'));
  } else {
    enfrentarMewtwo();
  }
}

function calcularDano(pokemonAtacado, ataque) {
  // ajustar o cálculo do dano conforme necessário
  const dano = Math.max(0, ataque - pokemonAtacado.defense);
  return dano;
}

function enfrentarMewtwo() {
  alert('Você está enfrentando o poderoso Mewtwo!');

  const mewtwoAttack = 20;
  const danoRecebido = calcularDano(pokemons.Mewtwo, mewtwoAttack);
  alert(`Mewtwo atacou com Psychic! Você sofreu ${danoRecebido} de dano.`)
  hpJogador -= danoRecebido;

  if (hpJogador > 0) {
    alert(`Seu HP: ${hpJogador}\n O que deseja fazer? (atacar/curar)`);
    exibirOpcoesJogador(pokemons[pokemonEscolhido]);

  } else {
    reiniciarJogo();
  }
}

function exibirOpcoesJogador() {
  const resposta = prompt(`Seu HP: ${hpJogador}\n O que deseja fazer? (atacar/curar)`);
    if (resposta && resposta.toLowerCase() === 'atacar') {
      // lógica para atacar
      const danoCausado = calcularDano(pokemons[pokemonEscolhido], pokemons[pokemonEscolhido].attack);
      pokemons.Mewtwo.hp -= danoCausado;
      alert(`Você atacou Mewtwo! Mewtwo sofreu ${danoCausado} de dano e está com ${pokemons.Mewtwo.hp} de vida.`)
      // verificar se o ataque é suficiente para derrotar o mewtwo

      if (danoCausado >= pokemons.Mewtwo.hp) {
        alert('Você derrotou o Mewtwo! Parabéns!');
        reiniciarJogo();
      } else {
        enfrentarMewtwo();
      }


    } else if (resposta && resposta.toLowerCase() === 'curar') {
      // lógica para curar
      const cura = 20; // quantidade de cura
      hpJogador += cura;
      alert(`Você se curou em ${cura} pontos de HP. Seu HP agora é ${hpJogador}.`)

      enfrentarMewtwo();

    } else {
      alert('Opção inválida. O jogo será reiniciado.');
      reiniciarJogo();
  }
}



function reiniciarJogo() {
  alert('O jogo será reiniciado.');
  window.location.reload();
}

