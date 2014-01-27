function Core() {
  var convert = new Convert();
  var translate = new Translate();
  
  var number = Math.ceil(document.getElementById('number').value.replace(/\s+/g,''));
  if (number <= 999999999999999) {
    var stringNumber = translate.numberToWords(number);
    var number8 =  convert.convert10to8(number);
    if (number8 <= 999999999999999) {
      var convertStringNumber = translate.numberToWords(number8);
      document.getElementById('to_words_8').value = convertStringNumber;
    } else {
      alert("Слишком большое число в восьмеричной системе");
    }
    document.getElementById('to_words').value = stringNumber;
  } else {
    alert("Слишком большое число");
  }
}