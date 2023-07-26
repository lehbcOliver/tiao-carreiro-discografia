export function ConvertInMinutes(value: number) {
  const minutesAmount = Math.floor(value / 60);
  const secondsAmount = value % 60;
  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');
  const convert = `${minutes}:${seconds}`;
  return convert;

}

export function ConvertInDecimal(value: string) {
  const number = value.split(':');
  const decimal = Number(number[0]) * 60;
  const total = decimal + Number(number[1]);
  return total;
}

ConvertInDecimal('3:15')