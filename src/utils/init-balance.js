import Balance from '@/models/balance';

export const initializeBalance = async (initialBalance) => {
  try {
    const existingBalance = await Balance.findOne();
    if (existingBalance) {
      console.log('Balance already exists. Skipping initialization.');
      return;
    }

    const balance = new Balance({
      balance: initialBalance
    });
    
    await balance.save();
    console.log('Balance initialized successfully.');
  } catch (error) {
    console.error('Error initializing balance:', error);
  }
};
