import { expect, test } from 'vitest';
import { isEnumValid } from './isEnumValid';
import { assert, IsExact } from 'conditional-type-checks';

test('is valid enum - only number implicit', () => {
  enum OnlyNumber {
    Test,
    Test2,
  }

  const param = 0 as unknown;

  expect(isEnumValid(param, OnlyNumber)).toBeTruthy();
  expect(isEnumValid(3, OnlyNumber)).toBeFalsy();
  expect(isEnumValid('Test', OnlyNumber)).toBeFalsy();

  if (isEnumValid(param, OnlyNumber)) {
    assert<IsExact<typeof param, OnlyNumber>>(true);
  } else {
    assert<IsExact<typeof param, OnlyNumber>>(false);
  }
});

test('is valid enum - only number explicit', () => {
  enum OnlyNumber {
    Test = 0,
    Test2 = 1,
  }

  const param = 0 as unknown;

  expect(isEnumValid(param, OnlyNumber)).toBeTruthy();
  expect(isEnumValid(3, OnlyNumber)).toBeFalsy();
  expect(isEnumValid('Test', OnlyNumber)).toBeFalsy();

  if (isEnumValid(param, OnlyNumber)) {
    assert<IsExact<typeof param, OnlyNumber>>(true);
  } else {
    assert<IsExact<typeof param, OnlyNumber>>(false);
  }
});

test('is valid enum - only string', () => {
  enum OnlyString {
    Test = 'Test',
    Test2 = 'Test2',
  }

  const param = 'Test' as unknown;

  expect(isEnumValid(param, OnlyString)).toBeTruthy();
  expect(isEnumValid(0, OnlyString)).toBeFalsy();
  expect(isEnumValid('Invalid', OnlyString)).toBeFalsy();

  if (isEnumValid(param, OnlyString)) {
    assert<IsExact<typeof param, OnlyString>>(true);
  } else {
    assert<IsExact<typeof param, OnlyString>>(false);
  }
});
