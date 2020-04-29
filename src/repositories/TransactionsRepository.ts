import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(t => t.type === 'income')
      .map(t => t.value)
      .reduce((va, vb) => va + vb, 0);

    const outcome = this.transactions
      .filter(t => t.type === 'outcome')
      .map(t => t.value)
      .reduce((va, vb) => va + vb, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
