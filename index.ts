import { readCSV } from './model/readCSV';
import { writeCSV } from './model/writeCSV';
import { adicionarItem, listarItens, mediaPeso, mediaValor, pesoTotal, quantidadeItens, quantidadeProdutos, removerItem, valorTotal } from './controller/controleEstoque';
import { rl, question } from './controller/controleEstoque';
const menu = async () => {
    console.log("\n****** Menu de opções ******\n");
    console.log("0 - Sair");
    console.log("1 - Adicionar um item");
    console.log("2 - Remover um item");
    console.log("3 - Listar itens");
    console.log("4 - Calcular valor total");
    console.log("5 - Calcular peso total");
    console.log("6 - Calcular quantidade total de itens");
    console.log("7 - Calcular quantidade total de produtos");
    console.log("8 - Calcular média de valor");
    console.log("9 - Calcular média de peso");
}

const main = async () => {
    let continuar = true;

    while (continuar) {
        menu();
        const opcaoMenu = parseInt(await question('Escreva qual opção deseja: '));

        switch (opcaoMenu) {
            case 0:
                console.log("Saindo do programa.");
                continuar = false;
                break;
            case 1:
                await adicionarItem();
                break;
            case 2:
                await removerItem();
                break;
            case 3:
                await listarItens();
                break;
            case 4:
                await valorTotal();
                break;
            case 5:
                await pesoTotal();
                break;
            case 6:
                await quantidadeItens();
                break;
            case 7:
                await quantidadeProdutos();
                break;
            case 8:
                await mediaValor();
                break;
            case 9:
                await mediaPeso();
                break;
            default:
                console.log("Opção inválida");
                break;
        }
    }

    console.log("Obrigado por utilizar nosso sistema de gestão de estoque. Até mais!");
    rl.close();
};

main();
