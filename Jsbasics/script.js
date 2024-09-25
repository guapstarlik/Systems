class Beverage {
    constructor(temperature, type, toppings = '') {
      this.temperature = temperature;
      this.type = type;
      this.toppings = toppings;
    }
  
    drink() {
      console.log(`${this.temperature} ${this.type} is being drunk`);
    }
    spill() {
    console.log (`${this.temperature} ${this.type} ${this.toppings} just spilled`);
    }
  }

  
  
  const newBev = new Beverage('cold', 'tea');
  const newSpill = new Beverage('hot', 'coffee', 'creamer');

  newBev.drink(); // drinking cold tea
  newSpill.spill(); // hot coffee with creamer just spilled
