const LABEL_END = 30;
const PREFIX = '▨▨▨ ';
const EMPTY_STRING = ' ';

export default function bold(label) {
  const decorateLabel = `${PREFIX} ${label}`;
  const labelLength = decorateLabel.length;
  const emptyString = labelLength < LABEL_END ? Array(LABEL_END - labelLength).join(EMPTY_STRING) + EMPTY_STRING : '';
  return decorateLabel + emptyString;
}