# Kimchi Premium 🌶️

비트코인 김치 프리미엄을 실시간으로 계산하는 Claude Code 스킬입니다.
한국 거래소(업비트)와 글로벌 거래소(바이낸스)의 비트코인 가격을 비교하여 프리미엄(%)과 원화 가격 차이를 산출합니다.

Calculate the real-time Bitcoin Kimchi Premium by comparing prices on Upbit (KRW) and Binance (USD).

## What is Kimchi Premium?

김치 프리미엄은 한국 암호화폐 거래소에서 거래되는 비트코인 가격이 글로벌 거래소 대비 얼마나 높은지를 나타내는 지표입니다.

- **양의 프리미엄 (Positive Premium)**: 한국 가격이 글로벌 가격보다 높음 — 한국 시장의 수요가 강하거나 자본 유출입 규제의 영향
- **음의 프리미엄 (Negative Premium / Discount)**: 한국 가격이 글로벌 가격보다 낮음 — 한국 시장의 매도 압력이 크거나 글로벌 시장의 급등
- **역사적으로** 김치 프리미엄은 2017~2018년 불장에서 최대 50% 이상까지 치솟은 적이 있으며, 시장 과열의 신호로 해석되기도 합니다

The Kimchi Premium refers to the price difference of Bitcoin between South Korean cryptocurrency exchanges (like Upbit) and global exchanges (like Binance). When Korean prices are higher, it indicates strong local demand.

## Features

- 🚀 **Real-time price comparison** — 업비트와 바이낸스의 최신 시세를 실시간 비교
- 💱 **Automatic USD/KRW exchange rate** — ExchangeRate-API를 통한 자동 환율 변환
- 📊 **Premium percentage calculation** — 프리미엄 비율(%)과 원화 가격 차이(KRW) 동시 계산
- ⚡ **Fast parallel API calls** — 3개 API를 `Promise.all`로 병렬 호출하여 빠른 응답
- 🎯 **No dependencies** — Node.js `https` 내장 모듈만 사용, 별도 설치 불필요
- 🛡️ **Robust error handling** — 5초 타임아웃, HTTP 상태 코드 검증, JSON 파싱 에러 처리

## Installation

```bash
git clone https://github.com/seungdols/kimchi-premium.git
cd kimchi-premium
```

## Usage

### As a standalone script

```bash
node index.js
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

- Node.js >= 18.0.0
- 인터넷 연결 (3개 외부 API 호출 필요)

## How It Works

1. **환율 조회** — `open.er-api.com`에서 실시간 USD/KRW 환율을 가져옵니다
2. **업비트 시세 조회** — `api.upbit.com`에서 KRW-BTC 마켓의 현재 체결가를 가져옵니다
3. **바이낸스 시세 조회** — `api.binance.com`에서 BTCUSDT 심볼의 현재 가격을 가져옵니다
4. **원화 변환** — 바이낸스 USD 가격에 환율을 곱해 원화(KRW)로 변환합니다
5. **프리미엄 계산** — `((업비트 가격 - 바이낸스 원화 환산 가격) / 바이낸스 원화 환산 가격) × 100`으로 프리미엄 비율을 산출합니다

## Error Handling

- **5-second timeout** — API 응답이 5초 이내에 오지 않으면 자동으로 요청을 중단합니다
- **HTTP status validation** — 2xx 이외의 응답 코드에 대해 명확한 에러 메시지를 반환합니다
- **JSON parsing protection** — 잘못된 JSON 응답에 대한 안전한 에러 처리
- **Structured error output** — 모든 에러를 JSON 형식(`{ "error": "..." }`)으로 출력하여 파싱이 용이합니다

## License

MIT

## Author

seungdols

## Contributing

Issues and pull requests are welcome!
