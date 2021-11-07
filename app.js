console.log('[Lucas Martins] Flappy Bird')

const somDe_HIT = new Audio()
somDe_HIT.src = './sound/sfx_hit.wav'

const somDe_WING = new Audio()
somDe_WING.src = './sound/sfx_wing.wav'
const sprites = new Image()
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')
let frames = 0
// [Plano de Fundo]
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
        contexto.fillStyle = '#70c5ce'
        contexto.fillRect(0,0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX , planoDeFundo.spriteY, // Sprite X, Sprite Y
            planoDeFundo.largura , planoDeFundo.altura, // Tamanho do recorte na sprite
            planoDeFundo.x , planoDeFundo.y,
            planoDeFundo.largura , planoDeFundo.altura,
        )
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX , planoDeFundo.spriteY, // Sprite X, Sprite Y
            planoDeFundo.largura , planoDeFundo.altura, // Tamanho do recorte na sprite
            (planoDeFundo.x + planoDeFundo.largura) , planoDeFundo.y,
            planoDeFundo.largura , planoDeFundo.altura,
        )
    }
}
// [Chão]
function criaChao(){
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualizar(){
            const movimentoDoChao = 1 
            const repeteEm = chao.largura / 2 + 1
            const movimentacao = chao.x - movimentoDoChao
            chao.x = movimentacao % repeteEm
        },
        desenha() {
            contexto.drawImage(
                sprites,
                chao.spriteX , chao.spriteY, // Sprite X, Sprite Y
                chao.largura , chao.altura, // Tamanho do recorte na sprite
                chao.x , chao.y,
                chao.largura , chao.altura,
            )
            contexto.drawImage(
                sprites,
                chao.spriteX , chao.spriteY, // Sprite X, Sprite Y
                chao.largura , chao.altura, // Tamanho do recorte na sprite
                (chao.x + chao.largura), chao.y,
                chao.largura , chao.altura,
            )
        }
    }
    return chao
    
}
function fazColisao (flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura
    const chaoY = chao.y
    return (flappyBirdY >= chaoY)
}
function criaFlappyBird() {
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 34,
        altura: 24,
        x: 145,
        y: 225,
        velocidade: 0,
        gravidade: 0.2,
        pulo: 4.6,
        pula() {
            flappyBird.velocidade = -flappyBird.pulo
        },
        atualiza() {
            if(fazColisao(flappyBird, globais.chao)) {
                somDe_HIT.play()
                setTimeout(()=>{
                    mudaParaTela(Telas.INICIO)
                },500)
                return
            }
            flappyBird.velocidade += flappyBird.gravidade
            flappyBird.y += flappyBird.velocidade
        },
        movimentos: [
            { spriteX: 0, spriteY: 0}, // asa para cima
            { spriteX: 0, spriteY: 26}, // asa no meio
            { spriteX: 0, spriteY: 52},  // asa para baixo
            { spriteX: 0, spriteY: 26} // asa no meio
        ],
        frameAtual: 0,
        atualizaOFrameAtual(){
            const intervaloDeFrames = 10
            const passouOIntervalo = frames % intervaloDeFrames == 0
            if(passouOIntervalo){
                const baseDoIncremento = 1
                const incremento = baseDoIncremento + flappyBird.frameAtual
                const baseRepeticao = flappyBird.movimentos.length
                flappyBird.frameAtual = incremento % baseRepeticao
            }
        },
        desenha() {
            flappyBird.atualizaOFrameAtual()
            const {spriteX, spriteY} = flappyBird.movimentos[flappyBird.frameAtual]

            contexto.drawImage(
                sprites,
                spriteX ,spriteY, // Sprite X, Sprite Y
                flappyBird.largura , flappyBird.altura, // Tamanho do recorte na sprite
                flappyBird.x , flappyBird.y,
                flappyBird.largura , flappyBird.altura,
            )
        }
    }
    return flappyBird
}

// [MensagemGetReady]
const mensagemGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.spriteX , mensagemGetReady.spriteY, // Sprite X, Sprite Y
            mensagemGetReady.largura , mensagemGetReady.altura, // Tamanho do recorte na sprite
            mensagemGetReady.x , mensagemGetReady.y,
            mensagemGetReady.largura , mensagemGetReady.altura,
        )
    }
}


function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169
        },
        ceu: {
            spriteX: 52,
            spriteY: 169
        },
        espaco: 80,
        desenha() {     
            canos.pares.forEach((par) => {
                const yRandom = par.y
                const espacamentoEntreCanos = 90

                const canoCeuX = par.x
                const canoCeuY = yRandom
                
                // [Cano do Céu]
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura
                    )
                    
                // [Cano do Chão]
                const canoChaoX = par.x
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura
                    )
                        
                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }
            })
            
        },
        temColisaoComOFlappyBird(par){
            const cabecaDoFlappy = globais.flappyBird.y
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura
            
            if(globais.flappyBird.x + globais.flappyBird.largura >= par.x) {
                if(cabecaDoFlappy <= par.canoCeu.y){
                    return true
                }
                if(peDoFlappy >= par.canoChao.y){
                    return true
                }
            }
            return false
        },
        pares: [],
        atualiza() {
            const passou100Frames = frames % 100 === 0
            if(passou100Frames) {
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1)
                })
            }
            canos.pares.forEach((par) => {
                par.x -= 2
                if(canos.temColisaoComOFlappyBird(par)) {
                    somDe_HIT.play()
                   // setTimeout(()=>{
                   //     mudaParaTela(Telas.INICIO)
                   // },500)
                    //return
                }
                 if(par.x + canos.largura <= 0 ) {
                     canos.pares.shift()
                    }
                })
            }
        }
        return canos
    }

function criaPlacar () {
    const placar = {
        pontuacao: 0,
        canoJaContado: false,
        desenha(){
            contexto.font = '50px "VT323"'
            contexto.fillStyle = 'white'
            contexto.fillText(`${placar.pontuacao}`, 145, 100)
            
        },
        atualiza() {
            if(globais.canos.pares[0] !== undefined){
                let valor = globais.canos.pares[0].x
                console.log(globais.canos.pares[0])
                if( valor <= 145 && !placar.canoJaContado){
                    placar.pontuacao += 1
                    placar.canoJaContado = true
                }
            } else {
                placar.canoJaContado = false
            }
        }
    }
    return placar
}

//
// [Telas]
//
const globais = {}
let telaAtiva = {}
function mudaParaTela(novaTela) {
    telaAtiva = novaTela
    if(telaAtiva.inicializa) {
        telaAtiva.inicializa()
    }
}
const Telas = {
    INICIO: {
        inicializa(){
            globais.flappyBird = criaFlappyBird()
            globais.chao = criaChao()
            globais.canos =criaCanos()
        },
        desenha(){
            planoDeFundo.desenha()
            globais.flappyBird.desenha()

            globais.chao.desenha()
            mensagemGetReady.desenha()
        },
        click(){
            mudaParaTela(Telas.JOGO)
        },
        atualiza(){
            globais.chao.atualizar()
        }
    }
}

Telas.JOGO ={
    inicializa(){
        globais.placar = criaPlacar()
    },
    desenha() {
        planoDeFundo.desenha()
        globais.canos.desenha()
        globais.chao.desenha()
        globais.flappyBird.desenha()
        globais.placar.desenha()
    },
    click(){
        somDe_WING.play()
        globais.flappyBird.pula()
    },
    atualiza(){
        globais.canos.atualiza()
        globais.chao.atualizar()
        globais.flappyBird.atualiza()
        globais.placar.atualiza()
    }
}
function loop() {
    telaAtiva.desenha()
    telaAtiva.atualiza()
    
    frames = frames +1;
    requestAnimationFrame(loop)
}


window.addEventListener('click', function(){
    if(telaAtiva.click){
        telaAtiva.click()
    }
})

mudaParaTela(Telas.INICIO)
loop()