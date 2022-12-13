import { expect, test } from 'vitest';
import { isValidEnumValue } from './isValidEnumValue';
import { assert, IsExact } from 'conditional-type-checks';

test('is valid enum - only number implicit', () => {
  enum OnlyNumber {
    Test,
    Test2,
  }

  const param = 0 as unknown;

  expect(isValidEnumValue(param, OnlyNumber)).toBeTruthy();
  expect(isValidEnumValue(3, OnlyNumber)).toBeFalsy();
  expect(isValidEnumValue('Test', OnlyNumber)).toBeFalsy();

  if (isValidEnumValue(param, OnlyNumber)) {
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

  expect(isValidEnumValue(param, OnlyNumber)).toBeTruthy();
  expect(isValidEnumValue(3, OnlyNumber)).toBeFalsy();
  expect(isValidEnumValue('Test', OnlyNumber)).toBeFalsy();

  if (isValidEnumValue(param, OnlyNumber)) {
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

  expect(isValidEnumValue(param, OnlyString)).toBeTruthy();
  expect(isValidEnumValue(0, OnlyString)).toBeFalsy();
  expect(isValidEnumValue('Invalid', OnlyString)).toBeFalsy();

  if (isValidEnumValue(param, OnlyString)) {
    assert<IsExact<typeof param, OnlyString>>(true);
  } else {
    assert<IsExact<typeof param, OnlyString>>(false);
  }
});
