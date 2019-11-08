const fn = arg => {
  console.log(arg);
};

class People {
  constructor() {
    this.p = 1;
  }

  f() {
    console.log(this.p);
  }
}

const p = new People();

p.f();

const a = Array.from([1]);
console.log(a, "array from");
