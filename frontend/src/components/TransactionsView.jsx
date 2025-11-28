import React from 'react'

export default function TransactionsView({ transactions }) {
  const grouped = transactions.reduce((acc, tx) => {
    const key = tx.date
    acc[key] = acc[key] || []
    acc[key].push(tx)
    return acc
  }, {})

  return (
    <div className="p-3 rounded-xl bg-white shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-semibold">Transactions</div>
        <div className="text-xs text-gray-400">Show AI summary</div>
      </div>

      {Object.keys(grouped).map(date => (
        <div key={date} className="mb-2">
          <div className="text-xs text-gray-400">{date}</div>
          <div className="space-y-1 mt-1">
            {grouped[date].map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                <div>
                  <div className="text-sm">{tx.merchant}</div>
                  <div className="text-xs text-gray-400">{tx.category}</div>
                </div>
                <div className={`text-sm font-medium ${tx.amount < 0 ? 'text-red-500' : 'text-green-600'}`}>{tx.amount < 0 ? `-₹${Math.abs(tx.amount)}` : `+₹${tx.amount}`}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
