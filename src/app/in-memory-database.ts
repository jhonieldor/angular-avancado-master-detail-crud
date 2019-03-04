import { InMemoryDbService } from "angular-in-memory-web-api"
import { Category } from './pages/categories/shared/category.model';
import { Entry } from './pages/entries/shared/entry.model';

export class InMemoryDatabase implements InMemoryDbService {
    createDb() {
        const categories: Category[] = [
            { id: 1, name: "Moradia", description: "Pagamentos de Contas da Casa" },
            { id: 2, name: "Saúde", description: "Plano de Saúde e Remédios" },
            { id: 3, name: "Lazer", description: "Cinema, parques, praia, etc" },
            { id: 4, name: "Salário", description: "Recebimento de Salário" },
            { id: 5, name: "Freelas", description: "Trabalhos como freelancer" }
        ]

        const entries: Entry[] = [
            { id: 1, name: 'Gás de Cozinha', categoryId: categories[0].id, category: categories[0], paid: false, date: '05/01/2018', amount: '600,58', type: 'expense', description: ''} as Entry,
            { id: 2, name: 'Sumplementos', categoryId: categories[1].id, category: categories[1], paid: true, date: '05/01/2018', amount: '1800,50', type: 'revenue', description: ''} as Entry,
            { id: 3, name: 'Salário na Empresa X', categoryId: categories[2].id, category: categories[2], paid: true, date: '10/01/2018', amount: '600,37', type: 'expense', description: ''} as Entry,
            { id: 4, name: 'Aluguel de Filme', categoryId: categories[0].id, category: categories[0], paid: false, date: '05/02/2018', amount: '600,58', type: 'expense', description: ''} as Entry,
            { id: 5, name: 'Sumplementos', categoryId: categories[1].id, category: categories[1], paid: true, date: '05/02/2018', amount: '1800,50', type: 'revenue', description: ''} as Entry,
            { id: 6, name: 'Combustível', categoryId: categories[2].id, category: categories[2], paid: true, date: '10/02/2018', amount: '400,94', type: 'expense', description: ''} as Entry,
            { id: 7, name: 'Aluguel', categoryId: categories[0].id, category: categories[0], paid: false, date: '05/03/2018', amount: '600,58', type: 'expense', description: ''} as Entry,
            { id: 8, name: 'Salário', categoryId: categories[1].id, category: categories[1], paid: true, date: '05/03/2018', amount: '1800,50', type: 'revenue', description: ''} as Entry,
            { id: 9, name: 'Combustível', categoryId: categories[2].id, category: categories[2], paid: true, date: '10/03/2018', amount: '397,98', type: 'expense', description: ''} as Entry,
            { id: 10, name: 'Aluguel', categoryId: categories[0].id, category: categories[0], paid: false, date: '05/04/2018', amount: '600,58', type: 'expense', description: ''} as Entry,
            { id: 11, name: 'Salário', categoryId: categories[1].id, category: categories[1], paid: true, date: '05/04/2018', amount: '1800,50', type: 'revenue', description: ''} as Entry,
            { id: 12, name: 'Combustível', categoryId: categories[2].id, category: categories[2], paid: true, date: '10/04/2018', amount: '397,98', type: 'expense', description: ''} as Entry,
            { id: 13, name: 'Jiu Jitsu', categoryId: categories[3].id, category: categories[3], paid: true, date: '10/04/2018', amount: '580,25', type: 'expense', description: ''} as Entry
          ];

        return { categories, entries }
    }
}