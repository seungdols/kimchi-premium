import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculatePremium } from '../index.mjs';

describe('calculatePremium', () => {
  const validRateData = { rates: { KRW: 1300 } };
  const validUpbitData = [{ trade_price: 130000000 }];
  const validBinanceData = { price: '95000' };

  it('should calculate premium correctly with valid data', () => {
    const result = calculatePremium(validRateData, validUpbitData, validBinanceData);

    assert.equal(result.exchangeRate, 1300);
    assert.equal(result.upbitPriceKRW, 130000000);
    assert.equal(result.binancePriceUSD, 95000);
    assert.equal(result.binancePriceKRW, 95000 * 1300);
    assert.equal(typeof result.premiumRate, 'number');
    assert.equal(typeof result.priceDiff, 'number');
  });

  it('should calculate positive premium when upbit price is higher', () => {
    const result = calculatePremium(validRateData, validUpbitData, validBinanceData);
    const expectedBinanceKRW = 95000 * 1300;
    const expectedPremium = ((130000000 - expectedBinanceKRW) / expectedBinanceKRW) * 100;

    assert.ok(Math.abs(result.premiumRate - expectedPremium) < 0.001);
  });

  it('should calculate negative premium when upbit price is lower', () => {
    const lowUpbitData = [{ trade_price: 100000000 }];
    const result = calculatePremium(validRateData, lowUpbitData, validBinanceData);

    assert.ok(result.premiumRate < 0);
  });

  it('should throw on invalid exchange rate data', () => {
    assert.throws(() => calculatePremium({}, validUpbitData, validBinanceData), {
      message: 'Invalid exchange rate data',
    });
    assert.throws(() => calculatePremium({ rates: { KRW: -1 } }, validUpbitData, validBinanceData), {
      message: 'Invalid exchange rate data',
    });
    assert.throws(() => calculatePremium(null, validUpbitData, validBinanceData), {
      message: 'Invalid exchange rate data',
    });
  });

  it('should throw on invalid Upbit data', () => {
    assert.throws(() => calculatePremium(validRateData, [], validBinanceData), {
      message: 'Invalid Upbit price data',
    });
    assert.throws(() => calculatePremium(validRateData, [{ trade_price: 'abc' }], validBinanceData), {
      message: 'Invalid Upbit price data',
    });
    assert.throws(() => calculatePremium(validRateData, null, validBinanceData), {
      message: 'Invalid Upbit price data',
    });
  });

  it('should throw on invalid Binance data', () => {
    assert.throws(() => calculatePremium(validRateData, validUpbitData, {}), {
      message: 'Invalid Binance price data',
    });
    assert.throws(() => calculatePremium(validRateData, validUpbitData, { price: 'invalid' }), {
      message: 'Invalid Binance price data',
    });
    assert.throws(() => calculatePremium(validRateData, validUpbitData, null), {
      message: 'Invalid Binance price data',
    });
  });
});
