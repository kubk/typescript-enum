import { enumValues } from './enumValues';
import { expect, test } from 'vitest';
import { assert, IsExact } from 'conditional-type-checks';

test('get enum values - only number', () => {
  enum OnlyNumber {
    Test,
    Test2,
  }

  const result = enumValues(OnlyNumber);

  expect(result).toStrictEqual([0, 1]);

  assert<IsExact<typeof result, OnlyNumber[]>>(true);
});

test('get enum values - only string', () => {
  enum OnlyString {
    Test = 'Test',
    Test2 = 'Test2',
  }

  const result = enumValues(OnlyString);
  expect(result).toStrictEqual(['Test', 'Test2']);

  assert<IsExact<typeof result, OnlyString[]>>(true);
});

test('get enum values - only number explicit', () => {
  enum OnlyNumberExplicit {
    Test = 0,
    Test2 = 1,
  }

  const result = enumValues(OnlyNumberExplicit);
  expect(result).toStrictEqual([0, 1]);

  assert<IsExact<typeof result, OnlyNumberExplicit[]>>(true);
});
