# Kimchi Premium 🌶️

A Claude Code skill that calculates the real-time Bitcoin Kimchi Premium.
Compares Bitcoin prices between a Korean exchange (Upbit, KRW) and a global exchange (Binance, USD) to produce the premium percentage and price difference in KRW.

## What is Kimchi Premium?

The Kimchi Premium is a metric that measures how much higher (or lower) Bitcoin prices are on South Korean cryptocurrency exchanges compared to global exchanges.

- **Positive Premium**: Korean prices exceed global prices — driven by strong local demand or capital flow regulations
- **Negative Premium (Discount)**: Korean prices fall below global prices — caused by heavy sell pressure domestically or a sharp rally on global markets
- **Historically**, the Kimchi Premium surged above 50% during the 2017–2018 bull run and is often interpreted as a signal of market overheating

## Features

- 🚀 **Real-time price comparison** — Fetches the latest quotes from Upbit and Binance in real time
- 💱 **Automatic USD/KRW exchange rate** — Live conversion via ExchangeRate-API
- 📊 **Premium percentage calculation** — Outputs both the premium rate (%) and the absolute price difference (KRW)
- ⚡ **Fast parallel API calls** — All three APIs are called concurrently with `Promise.all`
- 🎯 **No dependencies** — Uses only the Node.js built-in `https` module, no installation needed
- 🛡️ **Robust error handling** — 5-second timeout, HTTP status code validation, and JSON parsing protection

## Installation

```bash
git clone https://github.com/seungdols/kimchi-premium.git
cd kimchi-premium
```

## Usage

### As a standalone script

```bash
node index.mjs
```

### As an OpenClaw skill

This skill is designed to work with [OpenClaw](https://github.com/anthropics/claude-code) (Claude Code).

Add this skill to your OpenClaw skills directory and run:

```bash
/kimchi-premium
```

## Example Output

```json
{
  "timestamp": "2/1/2026, 2:20:00 PM",
  "exchange_rate": "1,380 KRW/USD",
  "upbit_btc": "145,000,000 KRW",
  "binance_btc": "105,000 USD",
  "kimchi_premium": "0.15%",
  "price_diff": "217,000 KRW"
}
```

## API Sources

- **Exchange Rate**: [ExchangeRate-API](https://www.exchangerate-api.com/)
- **Upbit**: [Upbit API](https://docs.upbit.com/)
- **Binance**: [Binance API](https://binance-docs.github.io/apidocs/)

## Requirements

- Node.js >= 25.0.0
- Internet connection (calls three external APIs)

## How It Works

1. **Fetch exchange rate** — Retrieves the live USD/KRW rate from `open.er-api.com`
2. **Fetch Upbit price** — Gets the current BTC trade price on the KRW-BTC market from `api.upbit.com`
3. **Fetch Binance price** — Gets the current BTCUSDT price from `api.binance.com`
4. **Convert to KRW** — Multiplies the Binance USD price by the exchange rate to get the KRW equivalent
5. **Calculate premium** — `((Upbit price - Binance KRW price) / Binance KRW price) × 100` yields the premium percentage

## Error Handling

- **5-second timeout** — Automatically aborts API requests that do not respond within 5 seconds
- **HTTP status validation** — Returns a clear error message for any non-2xx response code
- **JSON parsing protection** — Safely handles malformed JSON responses
- **Structured error output** — All errors are emitted as JSON (`{ "error": "..." }`) for easy parsing

## License

MIT

## Author

seungdols

## Contributing

Issues and pull requests are welcome!
