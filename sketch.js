let bgImages = []; // Array para armazenar as imagens de fundo
let currentBgIndex = 0; // Índice da imagem de fundo atual
let isExpanded = false; // Controla o estado da aba
let contentWidth = 50;  // Largura inicial da aba
let buttons = [];       // Array para armazenar botões
let buttonHeight = 80;  // Altura dos botões
let buttonSpacing = 10; // Espaço entre os botões

function preload() {
  for (let i = 0; i < 7; i++) {
    bgImages[i] = loadImage(`imgs/${i + 1}.jpg`, 
      () => console.log(`Imagem ${i + 1} carregada`), 
      (err) => console.error(`Erro ao carregar a imagem ${i + 1}: ${err}`)
    );
  }
}

function setup() {
  setInterval(
    window.onload = function ()
    { 
        document.getElementById("myaudio").play(); 
    },1000)
  createCanvas(1360, 764); // Ajusta o tamanho do canvas

  // Criar os botões e escondê-los inicialmente
  let buttonLabels = [
    "Início",
    "O que é",
    "Faculdades",
    "Salário",
    "Vantagens",
    "Desvantagens",
    "Desafios",
  ];

  for (let i = 0; i < buttonLabels.length; i++) {
    let btn = createButton(buttonLabels[i]);
    btn.position(20, 20 + i * (buttonHeight + buttonSpacing));
    btn.size(contentWidth + 90, buttonHeight); // Aumenta a largura do botão
    btn.hide(); // Esconde os botões inicialmente
    
    // Define uma função para mudar o índice do fundo ao clicar no botão
    btn.mousePressed(() => {
      currentBgIndex = i; // Muda para o fundo correspondente ao botão
    });

    buttons.push(btn); // Armazena o botão no array de botões
  }
}

function draw() {
  // Desenha o fundo com base no índice atual
  background(bgImages[currentBgIndex]);

  // Desenha a "aba" no lado esquerdo com largura variável
  fill(50, 100, 200);
  rect(0, 0, contentWidth, height); // Aba vertical à esquerda
  
  if (!isExpanded) {
    // Texto do título da aba quando colapsada
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    push();
    translate(contentWidth / 2, height / 2);
    rotate(-PI / 2); // Roda o texto para alinhar verticalmente
    text("Conteúdo", 0, 0);
    pop();
    
    // Esconde os botões quando a aba está colapsada
    for (let btn of buttons) {
      btn.hide();
    }
  } else {
    // Mostra os botões quando a aba está expandida
    for (let btn of buttons) {
      btn.show();
    }
  }
}

// Função para expandir/colapsar a aba ao clicar
function mousePressed() {
  // Verifica se o clique foi na área da aba no lado esquerdo
  if (mouseX < contentWidth) {
    isExpanded = !isExpanded; // Alterna o estado expandido

    // Define a largura da aba com base no estado
    contentWidth = isExpanded ? 200 : 50;
    
    // Reposiciona os botões se a aba estiver expandida
    if (isExpanded) {
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].position(20, 20 + i * (buttonHeight + buttonSpacing));
      }
    }
  }
}
