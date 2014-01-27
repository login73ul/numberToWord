function Translate() {
  
  this.indices = []; // индексы ( тысячи, миллионы и т д)
  this.units = []; // единицы
  this.tens =[]; // целые десятки
  this.hundreds = []; // сотни
  this.rest = []; // остаток от сотни, остальные десятки
  
  this.russian = new RussianNumbers(); //словарь русских числительных
  
}

// разобьем на тысячи, миллионы, и т д
Translate.prototype.parseNumbersOfIndices = function(number) {
  var indices = [];
  //var number = this.number;
  if (number > 0) {
    for (var i = 0; i <= 4; i++) {
      indices[i]= number%1000;
      number = Math.floor(number/1000);
    }
  }
  this.indices = indices;
}

// разобьем на сотни, десятки, единицы
Translate.prototype.parseNumberOfHundreds = function(number) {
  //this.indices = this.parseNumbersOfIndices();
  if (number > 0 && this.indices[i] != 0) {
    for (var i = 0; i <= 4; i++) {
      this.units[i] = this.indices[i]%10; // единицы
      this.tens[i] = this.indices[i]%100-this.units[i]; // десятки
      this.hundreds[i] = this.indices[i]-this.tens[i]-this.units[i]; // сотни
      this.rest[i] = this.indices[i]%100; // две правых цифры в виде числа
    }
  }
}

// перевод числа в число прописью
Translate.prototype.numberToWords = function(number) {
  this.parseNumbersOfIndices(number);
  this.parseNumberOfHundreds(number);
  var result = '';
  for (var i = 4; i >= 0; i--) {
    if (this.indices[i]!= 0) {
      if (this.indices[i] / 100 != 0) {
        result += ' ' + this.russian.numbers_hundreds[this.hundreds[i]]; // ищем в словаре число прописью в сотнях
      }
      if (Math.floor(this.rest[i]/10) != 1 ) {  
        result += ' ' + this.russian.numbers_tens[this.tens[i]]; 
        switch (true) {
          case (i == 0 || i == 2 || i == 3 || i == 4): 
            result += ' ' + this.russian.numbers_units[this.units[i]]; 
            break;
          case (i == 1 ):
            if (this.units[i] == 1) {   
              result += ' ' + this.russian.head[0]; // + одна
            }
            if (this.units[i] == 2) {
              result += ' ' + this.russian.head[1]; // + две
            }
            if (this.units[i]>2) {
              result += ' ' + this.russian.numbers_units[this.units[i]];
            }
            break;
        };
      } else { 
         result += ' ' + this.russian.numbers_rest[this.rest[i]];  
      }
      
      // блок работы с индексами, приписываем тысячи, миллионы и т д
      if (this.rest[i]>=10 && this.rest[i]<=19) {
        result += ' ' + this.russian.ind[i][0][0];
      } else {
        switch (true) {
          case this.units[i] == 1 : 
            result += ' ' + this.russian.ind[i][0][1];
            break;
          case (this.units[i]>=2 && this.units[i]<=4): 
            result += ' ' + this.russian.ind[i][0][2];
            break;
          case ((this.units[i]>=5 && this.units[i]<=9) || this.units[i] == 0):
            result += ' ' + this.russian.ind[i][0][0];
            break;
        };
      }
    }
  }
   return result;
}
