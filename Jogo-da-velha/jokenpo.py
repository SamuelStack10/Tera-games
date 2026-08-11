import random

jogadorPontos = 0
pontosComputador = 0

escolha =["Pedra", "Papel", "Tesoura"]

while pontosComputador < 3 and jogadorPontos < 3:
    print("=== Jogo Pedra, Papel e Tesoura ===")
    print("Escolha uma opção: Pedra, Papel ou Tesoura")

    jogador = input("Sua escolha: ")

    computador = random.choice(escolha)
    print(f"Computador escolheu: {computador}")

    if jogador == computador:
        print("Empate!")
    elif (jogador == "Pedra" and computador == "Tesoura") or \
    (jogador == "Papel" and computador == "Pedra") or \
    (jogador == "Tesoura" and computador == "Papel"):
        print("Você venceu!")
        jogadorPontos += 1
    else:
        print("Computador venceu!")
        pontosComputador += 1

    print(f"Pontuação - Você: {jogadorPontos}, Computador: {pontosComputador}")