---
name: kimchi-premium
version: 1.0.0
description: >
  비트코인 김치 프리미엄 실시간 계산기.
  한국 거래소(업비트)와 글로벌 거래소(바이낸스)의 비트코인 가격 차이를 비교하여
  김치 프리미엄(%)과 원화 가격 차이를 계산합니다.
  실시간 USD/KRW 환율을 반영하며, 외부 의존성 없이 Node.js 내장 모듈만 사용합니다.
author: seungdols
permissions:
  network:
    - open.er-api.com
    - api.upbit.com
    - api.binance.com
---

# Kimchi Premium 🌶️

비트코인 **김치 프리미엄**을 실시간으로 계산하는 Claude Code 스킬입니다.

## 김치 프리미엄이란?

김치 프리미엄은 한국 암호화폐 거래소(업비트 등)에서 거래되는 비트코인 가격이
글로벌 거래소(바이낸스 등) 대비 얼마나 높은지를 나타내는 지표입니다.
한국 시장의 수요가 강할 때 프리미엄이 상승하며, 이는 투자 심리와 자본 유출입 규제의 영향을 받습니다.

## 이 스킬이 하는 일

1. **실시간 환율 조회** — ExchangeRate-API에서 USD/KRW 환율을 가져옵니다
2. **업비트 BTC 가격 조회** — 업비트 API에서 원화(KRW) 기준 비트코인 시세를 가져옵니다
3. **바이낸스 BTC 가격 조회** — 바이낸스 API에서 달러(USD) 기준 비트코인 시세를 가져옵니다
4. **프리미엄 계산** — 바이낸스 가격을 원화로 변환한 뒤, 업비트 가격과 비교하여 프리미엄(%)과 가격 차이(KRW)를 산출합니다

## 출력 예시

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

## Usage

```bash
node index.mjs
```

## 기술 특징

- 외부 의존성 없음 — Node.js `https` 내장 모듈만 사용
- 3개 API 병렬 호출로 빠른 응답 속도
- 5초 타임아웃으로 안정적인 에러 처리
- JSON 형식의 구조화된 출력
