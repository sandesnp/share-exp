export const fetchGroupDetails = async (groupId: String) => {
  // Replace with your desired static group data
  const staticGroupData = {
    name: 'Sample Group',
    totalExpense: 100.0,
    members: [{ name: 'John Doe' }, { name: 'Jane Smith' }],
    transactionHistory: [],
  };

  // Return the static data directly
  return staticGroupData;
};
