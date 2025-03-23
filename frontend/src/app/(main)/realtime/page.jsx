"use client"

export default function RealtimePage() {
  const stockData = [
    { symbol: "AAPL", price: "175.32", change: "+1.45%" },
    { symbol: "GOOGL", price: "2801.12", change: "-0.50%" },
    { symbol: "AMZN", price: "3450.00", change: "+2.10%" },
    { symbol: "TSLA", price: "820.11", change: "+1.25%" },
  ];

  const newsArticles = [
    {
      id: 1,
      title: "Market Rally: Unexpected Turn",
      date: "2025-03-23",
      content:
        "Stocks surged today as the market rebounded quickly from recent lows. Investors remain cautious ahead of upcoming earnings reports.",
    },
    {
      id: 2,
      title: "Tech Stocks Hit New Highs",
      date: "2025-03-22",
      content:
        "Major tech companies reported record-breaking earnings last quarter, propelling stock prices to all-time highs.",
    },
    {
      id: 3,
      title: "Energy Sector Sees Investment Bounce",
      date: "2025-03-21",
      content:
        "Renewable energy stocks are gaining traction as global investments in sustainable energy reach unprecedented levels.",
    },
  ];

  return (
    <div className="p-4 space-y-8 overflow-y-auto max-h-[calc(100vh-4rem)]">
      <section>
        <h2 className="text-2xl font-bold mb-4 text-white">Real-Time Stock Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stockData.map((stock) => (
            <div
              key={stock.symbol}
              className="border border-neutral-700 rounded p-4 bg-neutral-800 shadow"
            >
              <h3 className="text-xl font-semibold text-white">{stock.symbol}</h3>
              <p className="text-lg text-white">Price: ${stock.price}</p>
              <p
                className={`text-lg ${
                  stock.change.startsWith("+")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                Change: {stock.change}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-white">Latest News</h2>
        <div className="space-y-4">
          {newsArticles.map((article) => (
            <div
              key={article.id}
              className="border border-neutral-700 rounded p-4 bg-neutral-800 shadow"
            >
              <h3 className="text-xl font-semibold text-white">{article.title}</h3>
              <p className="text-sm text-neutral-400">{article.date}</p>
              <p className="text-white">{article.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}