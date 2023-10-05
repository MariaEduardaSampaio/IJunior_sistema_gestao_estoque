/*
 - responsável pelas funções principais do programa
 - basicamente todas as histórias de usuário 
 */

import { read } from 'fs';
import { EstoqueItem, readCSV } from '../model/readCSV';
import { writeCSV } from '../model/writeCSV';
import * as readline from 'readline';

const filePath = './model/estoque.csv';

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
function isFloat(value: any): boolean {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) !== value;

}

const adicionarItem = async () => {
    console.log('Adicionar um item ao inventário:\n');

    const nome = await question('Nome do produto: ');
    const peso = parseFloat(await question('Peso do produto (em kg): '));
    const valor = parseFloat(await question('Valor do produto (em R$): '));
    const quantidade = parseInt(await question('Quantidade disponível: '));

    var novoItem: EstoqueItem = { nome, peso, valor, quantidade, ativo: true };
    const data = await readCSV(filePath);

    try {
        if (data.find(item => item.nome.toUpperCase() === novoItem.nome.toUpperCase())) {
            throw new Error('Já existe um item com esse nome no inventário.');
        }

        if (novoItem.nome === '' || typeof (novoItem.nome) !== 'string') {
            throw new Error('Nome deve ser preenchido com uma string. Tente novamente.');
        }

        if (novoItem.peso <= 0.0 || isFloat(novoItem.peso) === false) {
            throw new Error('Peso menor que zero ou não decimal. Tente novamente.');
        }

        if (novoItem.valor <= 0.0 || isFloat(novoItem.valor) === false) {
            throw new Error('Preço menor que zero ou não decimal. Tente novamente.');
        }

        if (novoItem.quantidade <= 0) {
            throw new Error('Quantidade menor que zero. Tente novamente.');
        }

        data.push(novoItem);
        await writeCSV(data);

        console.log('Item adicionado com sucesso ao inventário.');
        console.log('Dados atualizados do CSV:', data);

    } catch (error) {
        console.error('Ocorreu um erro ao adicionar o item:', error);
    }

    rl.close();
};

const removerItem = async () => {
    console.log('Remover um item do inventário:\n');
    console.log('Qual o nome do item que deseja remover?\n');

    const nome = await question('Nome do produto: ');

    var data = await readCSV(filePath);

    try {
        const itemEncontrado = data.find(item => item.nome.toUpperCase() === nome.toUpperCase());
        if (!itemEncontrado) {
            throw new Error('Não existe um item com esse nome no inventário.');
        }

        if (itemEncontrado.ativo.toString() == "false") {
            throw new Error('Este item já está desativado no iventário.');
        }

        console.log("Item encontrado: ", itemEncontrado);
        console.log("Realmente deseja excluí-lo? (S/N)\n");
        const opcao = await question('Opção: ');

        if (opcao.toUpperCase() == "N") {
            console.log('Operação cancelada.\n');
        } else if (opcao.toUpperCase() == "S") {
            data = await readCSV(filePath);
            data.forEach(item => {
                if (item.nome.toUpperCase() === itemEncontrado.nome.toUpperCase()) {
                    item.ativo = false;
                }
            });
            await writeCSV(data);
            console.log("Item desativado.\n");
        } else {
            throw new Error('Opção inválida.');
        }

    } catch (error) {
        console.error('Ocorreu um erro ao remover o item:', error);
    }

    rl.close();
};

const listarItens = async () => {
    const data = await readCSV(filePath);
    data.forEach(item => {
        if (item.ativo) {
            console.log('\n\nitem ', data.indexOf(item) + 1);
            console.log('nome: ', item.nome);
            console.log('peso: ', item.peso + ' Kg/unid');
            console.log('valor: R$', item.valor);
            console.log('quantidade: ', item.quantidade + ' unid.');
        }
    });
    rl.close();
};

const valorTotal = async () => {
    const data = await readCSV(filePath);

    const somaTotal = data.reduce((acc, item) => {
        if (item.ativo) {
            acc += item.valor * item.quantidade;
        }
        return acc;
    }, 0);

    console.log('Valor total do inventário: R$', somaTotal);
    rl.close();
};

export { adicionarItem, removerItem, listarItens, valorTotal };