import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

// DTO
interface Request {
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Type is not valid');
    }

    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > balance.total) {
      throw Error('insufficient balance for the transaction');
    }

    const transaction = this.transactionsRepository.create(
      new Transaction({ title, value, type }),
    );

    return transaction;
  }
}

export default CreateTransactionService;
