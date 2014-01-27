function Convert() {
}

Convert.prototype.convert10to8 = function(number) {
  var res = '';
  var n = Math.ceil(number);
  do {
    res += n - 8*Math.floor(n/8);
    n = Math.floor(n/8);
  } while (n > 8);
  res += n;
  number = Math.ceil(res.split("").reverse().join(""));
  return number;
}