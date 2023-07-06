// "use client"

// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import DeleteIcon from '@mui/icons-material/Delete';

// export default function History() {
//   const [transactions, setTransactions] = useState([]);

//   const fetchTransactions = async () => {
//     try {
//       const response = await fetch('/api/seat-book');
//       if (response.ok) {
//         const data = await response.json();
//         setTransactions(data);
//       }
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const handleDeleteTransaction = async (transactionId) => {
//     try {
//       const response = await fetch(`/api/seat-book/${transactionId}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         // Refresh the transactions after successful deletion
//         fetchTransactions();
//       }
//     } catch (error) {
//       console.error('Error deleting transaction:', error);
//     }
//   };

//   const columns = [
//     { field: 'movieId', headerName: 'Movie ID', width: 100 },
//     { field: 'time', headerName: 'Time', width: 150 },
//     { field: 'bookerName', headerName: 'Booker Name', width: 150 },
//     { field: 'bookerAge', headerName: 'Booker Age', width: 120 },
//     {
//       field: 'seatNumbers',
//       headerName: 'Seat Numbers',
//       width: 150,
//       valueGetter: (params) => params.row.seatNumbers.join(', '),
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 100,
//       renderCell: (params) => (
//         <DeleteIcon
//           onClick={() => handleDeleteTransaction(params.row.id)}
//           style={{ cursor: 'pointer' }}
//         />
//       ),
//     },
//   ];

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid rows={transactions} columns={columns} />
//     </div>
//   );
// }

"use client"

import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';

export default function History() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/seat-book');
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDeleteTransaction = async (transactionId) => {
    console
    try {
      const response = await fetch(`/api/cancel-book/${transactionId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Refresh the transactions after successful deletion
        fetchTransactions();
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const getRowId = (transaction) => transaction.token; // Set the row id to the 'token' property

  const columns = [
    { field: 'movieId', headerName: 'Movie ID', width: 100 },
    { field: 'time', headerName: 'Time', width: 150 },
    { field: 'bookerName', headerName: 'Booker Name', width: 150 },
    { field: 'bookerAge', headerName: 'Booker Age', width: 120 },
    {
      field: 'seatNumbers',
      headerName: 'Seat Numbers',
      width: 150,
      valueGetter: (params) => params.row.seatNumbers.join(', '),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <DeleteIcon
          onClick={() => handleDeleteTransaction(params.row.token)}
          style={{ cursor: 'pointer' }}
        />
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={transactions} columns={columns} getRowId={getRowId} />
    </div>
  );
}
