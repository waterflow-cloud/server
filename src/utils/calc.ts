type Unit = 'Byte' | 'KB' | 'MB' | 'GB';
/**
 * Converts a number from one digital unit to another.
 * @param num - The number to be converted.
 * @param initUnit - The initial digital unit of the number.
 * @param targetUnit - The target digital unit to convert the number to.
 * @returns The converted number.
 */
export function convertDigitalUnit(num: number, initUnit: Unit, targetUnit: Unit): number {
  const units = {
    Byte: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
  };
  return parseFloat(((num * units[initUnit]) / units[targetUnit]).toFixed(3));
}
