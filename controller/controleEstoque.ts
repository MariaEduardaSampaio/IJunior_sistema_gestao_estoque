/*
 - responsável pelas funções principais do programa
 - basicamente todas as histórias de usuário 
 */

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

const adicionarItem = async () => {
    console.log('Adicionar um item ao inventário:\n');

    const nome = await question('Nome do produto: ');
    const peso = parseFloat(await question('Peso do produto (em kg): '));
    const valor = parseFloat(await question('Valor do produto (em R$): '));
    const quantidade = parseInt(await question('Quantidade disponível: '));

    const novoItem: EstoqueItem = { nome, peso, valor, quantidade };

    try {
        await writeCSV(novoItem);
        console.log('Item adicionado com sucesso ao inventário.');
    } catch (error) {
        console.error('Ocorreu um erro ao adicionar o item:', error);
    }

    rl.close();
};

export { adicionarItem };