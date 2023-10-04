import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import { EstoqueItem, readCSV } from './readCSV';

const filePath = './model/estoque.csv';

const writeCSV = async (novoItem: EstoqueItem): Promise<void> => {
    let dadosExistentes: EstoqueItem[] = [];

    try {
        dadosExistentes = await readCSV(filePath);
        dadosExistentes.push(novoItem);
    } catch (error) { /* caso o arquivo não exista, não há dados existentes */ }


    const csvWriter = createCsvWriter({
        path: filePath,
        header: [
            { id: 'nome', title: 'NOME' },
            { id: 'peso', title: 'PESO' },
            { id: 'valor', title: 'VALOR' },
            { id: 'quantidade', title: 'QUANTIDADE' },
        ],
        append: false,
    });

    return csvWriter.writeRecords(dadosExistentes);
};

export { writeCSV };