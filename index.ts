import {
    adicionarProduto, removerProduto, listarItens, calcularValorTotal,
    calcularPesoTotal, calcularQuantidadeItens, calcularQuantidadeProdutos,
    calcularMediaValor, calcularMediaPeso
} from './controller/controleEstoque';
import { EstoqueItem } from './model/data.interface';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer);
        });
    });
};

function menu() {
    console.log("\n****** Menu de opções ******\n");
    console.log("0 - Sair");
    console.log("1 - Adicionar um produto");
    console.log("2 - Remover um produto");
    console.log("3 - Listar itens");
    console.log("4 - Calcular valor total");
    console.log("5 - Calcular peso total");
    console.log("6 - Calcular quantidade total de itens");
    console.log("7 - Calcular quantidade total de produtos");
    console.log("8 - Calcular média de valor");
    console.log("9 - Calcular média de peso");
}

async function main() {
    let continuar = true;

    while (continuar) {
        menu();
        const opcaoMenu = parseInt(await question('Escreva qual opção deseja: '));

        switch (opcaoMenu) {
            case 0:
                console.log("Saindo do programa.");
                rl.close();
                continuar = false;
                break;
            case 1:
                const id = parseInt(await question('ID do produto: '));
                const nome = await question('Nome do produto: ');
                const peso = parseFloat(await question('Peso do produto (em kg): '));
                const valor = parseFloat(await question('Valor do produto (em R$): '));
                const quantidade = parseInt(await question('Quantidade disponível: '));
                var novoProduto: EstoqueItem = {
                    id, nome, peso, valor, quantidade, ativo: true
                };
                await adicionarProduto(novoProduto);
                break;

            case 2:

                console.log('Qual o ID do item que deseja remover?\n');
                const idProduto = parseInt(await question('ID do produto: '));
                await removerProduto(idProduto);
                break;

            case 3:
                await listarItens();
                break;

            case 4:
                await calcularValorTotal();
                break;

            case 5:
                await calcularPesoTotal();
                break;

            case 6:
                await calcularQuantidadeItens();
                break;

            case 7:
                await calcularQuantidadeProdutos();
                break;

            case 8:
                await calcularMediaValor();
                break;

            case 9:
                await calcularMediaPeso();
                break;

            default:
                console.log("Opção inválida!");
                break;
        }
    }

    console.log("Obrigado por utilizar nosso sistema de gestão de estoque. Até mais!");
};

main();

export { rl, question }