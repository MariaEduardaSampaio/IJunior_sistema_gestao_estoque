/*
chamadas diretas no csv e operações de leitura e escrita
*/
import { EstoqueItem } from '../model/readCSV';
import { readCSV } from '../model/readCSV';
import { writeCSV } from '../model/writeCSV';
import * as readline from 'readline';
const filePath = './model/estoque.csv';
import { read } from 'fs';


function isFloat(value: any): boolean {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) !== value;
}

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

const adicionarItemExceptions = async (): Promise<void> => {

    const data = await readCSV(filePath);
    const nome = await question('Nome do produto: ');
    const peso = parseFloat(await question('Peso do produto (em kg): '));
    const valor = parseFloat(await question('Valor do produto (em R$): '));
    const quantidade = parseInt(await question('Quantidade disponível: '));
    rl.close();


    var novoItem: EstoqueItem = { nome, peso, valor, quantidade, ativo: true };

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
        throw new Error('Valor menor que zero ou não decimal. Tente novamente.');
    }

    if (novoItem.quantidade <= 0) {
        throw new Error('Quantidade menor que zero. Tente novamente.');
    }

    data.push(novoItem);
    await writeCSV(data);
    console.log(await readCSV(filePath));
};

const removerItemExceptions = async (): Promise<void> => {

    const data = await readCSV(filePath);
    const nome = await question('Nome do produto: ');

    const itemEncontrado = data.find(item => item.nome.toUpperCase() === nome.toUpperCase());

    if (data.length === 0) {
        throw new Error('Não há itens cadastrados no inventário.');
    }
    if (!itemEncontrado) {
        throw new Error('Não existe um item com esse nome no inventário.');
    }

    if (itemEncontrado.ativo.toString() == "false") {
        throw new Error('Este item já está desativado no iventário.');
    }

    console.log("Item encontrado: ", itemEncontrado);
    console.log("Realmente deseja excluí-lo? (S/N)\n");

    const opcao = await question('Opção: ');
    rl.close();

    if (opcao.toUpperCase() == "N") {
        console.log('Operação cancelada.\n');
    }
    else if (opcao.toUpperCase() == "S") {
        data.forEach(item => {
            if (item.nome.toUpperCase() === itemEncontrado.nome.toUpperCase())
                item.ativo = false;
        });
        await writeCSV(data);
        console.log("Item desativado.\n");
    } else {
        throw new Error('Opção inválida.');
    }
};

const listarItensExceptions = async (): Promise<void> => {
    const data = await readCSV(filePath);
    data.forEach(item => {
        if (item.ativo.toString() === 'true') {
            console.log('\n\nitem ', data.indexOf(item) + 1);
            console.log('nome: ', item.nome);
            console.log('peso: ', item.peso + ' Kg/unid');
            console.log('valor: R$', item.valor);
            console.log('quantidade: ', item.quantidade + ' unid.');
        }
    });

    if (data.length === 0) {
        throw new Error('Não há itens cadastrados no inventário.');
    }

    // rl.close();

};

const valorTotalExceptions = async (): Promise<number> => {
    const data = await readCSV(filePath);

    const somaTotal = data.reduce((acc, item) => {
        if (item.ativo.toString() === 'true') {
            acc += item.valor * item.quantidade;
        }
        return acc;
    }, 0);

    if (data.length === 0) {
        throw new Error('Não há itens cadastrados no inventário.');
    }

    return somaTotal;
    // rl.close();
};

const pesoTotalExceptions = async (): Promise<number> => {
    const data = await readCSV(filePath);

    const pesoTotal = data.reduce((acc, item) => {
        if (item.ativo.toString() === 'true') {
            acc += item.peso * item.quantidade;
        }
        return acc;
    }, 0);

    if (data.length === 0) {
        throw new Error('Não há itens cadastrados no inventário.');
    }
    // rl.close()
    return pesoTotal;
};

const quantidadeItensExceptions = async (): Promise<number> => {
    const data = await readCSV(filePath);
    const qntdTotal = data.reduce((acc, item) => {
        if (item.ativo.toString() === 'true') {
            acc += parseInt(item.quantidade.toString());
        }
        return acc;
    }, 0);

    // rl.close();
    return qntdTotal;
};

const mediaValorExceptions = async (): Promise<number> => {
    const somaTotal = await valorTotalExceptions();
    const quantidadeTotal = await quantidadeItensExceptions();
    if (quantidadeTotal == 0) {
        throw new Error('Não há itens cadastrados no inventário.');
    }

    const mediaValor = somaTotal / quantidadeTotal;
    return mediaValor;
};

const mediaPesoExceptions = async (): Promise<number> => {
    const somaTotal = await pesoTotalExceptions();
    const quantidadeTotal = await quantidadeItensExceptions();

    if (quantidadeTotal == 0) {
        throw new Error('Não há itens cadastrados no inventário.');
    }
    // rl.close();

    const mediaPeso = somaTotal / quantidadeTotal;
    return mediaPeso;
};

const quantidadeProdutosExceptions = async (): Promise<number> => {
    const data = await readCSV(filePath);

    const produtos = data.reduce((acc, item) => {
        if (item.ativo.toString() === 'true') {
            acc++;
        }
        return acc;
    }, 0);

    // rl.close();
    return produtos;
};

export {
    adicionarItemExceptions, removerItemExceptions, listarItensExceptions,
    valorTotalExceptions, pesoTotalExceptions, quantidadeItensExceptions,
    mediaValorExceptions, mediaPesoExceptions, quantidadeProdutosExceptions
};