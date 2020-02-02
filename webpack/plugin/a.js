function convert(s, numRows) {
  if (numRows === 1) {
    return s;
  }
  var rows = Array(Math.min(s.length, numRows)).fill("");
  var currentRow = 0,
    goingDown = false;
  for (var i = 0; i < s.length; i++) {
    var c = s[i];
    rows[currentRow] += c;
    if (currentRow === 0 || currentRow == numRows - 1) {
      goingDown = !goingDown;
    }
    currentRow += goingDown ? 1 : -1;
  }
  var ret = "";
  for (var i = 0; i < rows.length; i++) {
    ret += rows[i];
  }
  return ret;
}
