export default function prefix(label, options = {}) {
  const { prefix = '▨▨▨', lineUp = 30, lineUpString = ' '} = options;
  const decorateLabel = `${prefix} ${label}`;
  const labelLength = decorateLabel.length;
  const emptyString = labelLength < lineUp ? Array(lineUp - labelLength).join(lineUpString) + lineUpString : '';
  return decorateLabel + emptyString;
}