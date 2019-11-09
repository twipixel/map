var timeLabelPrefix = '▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨ ';

export default function getTimeLabel(label) {
  return `${timeLabelPrefix} ${label}`;
}