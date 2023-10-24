type Unit = 'Byte' | 'KB' | 'MB' | 'GB';
export function convertUnit(num: number, initUnit: Unit, targetUnit: Unit) {
  const units = {
    Byte: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
  };
  return (num * units[initUnit]) / units[targetUnit];
}
