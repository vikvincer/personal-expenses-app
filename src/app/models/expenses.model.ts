export interface ExpensesModel {
    id?: number;
    desc: string;
    price: number;
    category: 'food' | 'housing'| 'transportation'| 'utilities'
    | 'insurance'| 'medical_healthcare'| 'saving_investment_debt'| 'personal_spending'
    | 'recreation_entertainment'| 'miscellaneous' | null;
    date: Date ;
}

export interface SortQueryModel { 
  titleType: string; 
  sort: any; 
}

export enum CategoryEnum {
    food = 'Food',
    housing = 'Housing',
    transportation = 'Transportation',
    utilities = 'Utilities',
    insurance = 'Insurance',
    medical_healthcare = 'Medical & Healthcare',
    saving_investment_debt = 'Saving, Investing, & Debt Payments',
    personal_spending = 'Personal Spending',
    recreation_entertainment = 'Recreation & Entertainment',
    miscellaneous = 'Miscellaneous'
}