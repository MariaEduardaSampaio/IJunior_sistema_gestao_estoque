import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import { EstoqueItem, readCSV } from './readCSV';

const filePath = './model/estoque.csv';

const writeCSV = async (dados: EstoqueItem[]): Promise<void> => {
    var dadosExistentes: EstoqueItem[] = [];

    try {
        dadosExistentes = await readCSV(filePath);
    } catch (error) {
        throw new Error("Erro ao ler o arquivo CSV.");
    }


    const csvWriter = createCsvWriter({
        path: filePath,
        header: [
            { id: 'nome', title: 'nome' },
            { id: 'peso', title: 'peso' },
            { id: 'valor', title: 'valor' },
            { id: 'quantidade', title: 'quantidade' },
            { id: 'ativo', title: 'ativo' },
        ]
    });

    return csvWriter.writeRecords(dados);
};

export { writeCSV };