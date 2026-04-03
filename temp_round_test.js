function roundToQuarter(date, direction) {
  const result = new Date(date);
  const minutes = result.getMinutes();
  const seconds = result.getSeconds();
  const totalSeconds = minutes * 60 + seconds;
  const intervalSeconds = 15 * 60;
  const remainder = totalSeconds % intervalSeconds;

  if (direction === 'down') {
    result.setSeconds(totalSeconds - remainder, 0);
  } else if (direction === 'up') {
    const roundUpSeconds = remainder === 0 ? 0 : intervalSeconds - remainder;
    result.setSeconds(totalSeconds + roundUpSeconds, 0);
  } else {
    const halfInterval = intervalSeconds / 2;
    const roundAdjustment = remainder < halfInterval ? -remainder : intervalSeconds - remainder;
    result.setSeconds(totalSeconds + roundAdjustment, 0);
  }
  return result;
}

const testTimes = [
  '2026-04-04T01:26:00',
  '2026-04-04T01:56:00',
  '2026-04-04T01:34:04',
  '2026-04-04T01:37:29',
  '2026-04-04T01:37:30',
];
for (const t of testTimes) {
  const d = new Date(t);
  console.log(t, 'nearest', roundToQuarter(d, 'nearest').toISOString(), 'down', roundToQuarter(d, 'down').toISOString(), 'up', roundToQuarter(d, 'up').toISOString());
}
