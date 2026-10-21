// ==========================================
// RECOVERED PRACTICE PROGRAMS (OCT 1 & OCT 2)
// ==========================================

// 1. Swapping two variables using destructuring
// let a=10;
// let b=20;
// [a, b] = [b, a];
// console.log(a);
// console.log(b);


// 2. Celsius to Fahrenheit conversion
// let a=32.3;
// f=a*(9/5)+32;
// console.log(f);


// 3. Pre-increment operator evaluation
// let a=5;
// let b=++a + ++a;
// console.log(a);
// console.log(b);


// 4. Movie ticket booking prompt & cost calculation
// let movie = prompt("Enter the Movie name:");
// let numberofticket= Number(prompt("Number of Ticket:"));
// let ticketprice=Number(prompt("Enter the ticketprice:"));
// let totalprice=numberofticket*ticketprice ;

// console.log("Movie:",movie);
// console.log("No of ticket:",numberofticket);
// console.log("Tickete Price:",ticketprice);
// console.log("Total Cost:",totalprice);


// #HTML & js combine
// var a=document.getElementById("one")
// function change(){
//     a.innerHTML="Welcome to Javascript"
// }


// #oct 1 learn
// let name="Gopi";
// let age=25;
// console.log(name);
// console.log(age);


// let age=17;
// if (age>=18){
//     console.log("Eligeble");
// }
// else{
//     console.log("not eligeble");
// }


// for(let i =1;i<=5;i++){
//     console.log(i);
// }

// let n=7
// let count=0

// for(let i=0;i<=n;i++){
//     if (n%i===0){
//         count++;
//     }
// }
//     if(count===2){
//         console.log("prime");
//     }else{
//         console.log("Not Prime");
//     }


// #oct 2 learn
// let arr=["Gopi",2];
// arr.forEach(data=>{
//     console.log(data);
// });


// let students=["John","Priya","Ram"];
// students.forEach(student=>{
//     console.log(student);
// });

// let numbers=[1,2,3,4];
// let result=numbers.map(num=>num*2);
//     console.log(result);


// let numbers=[10,15,20,25,30];
// let result=numbers.filter(num=>num>20);
// console.log(result);


// let sum=[10,20,30];
// const max=Math.max(...sum)
// console.log(max);


let mobile = {
    mobilename: "Nothing 3a",
    storage: "256 GB",
    ram: "8GB",
    battery: "6000mah",
    price: 30000
};

console.log(mobile.mobilename);
console.log(mobile.storage);
console.log(mobile.ram);
console.log(mobile.battery);
console.log(mobile.price);


// # Shirt Object
let shirt = {
    shirtname: "Casual Floral Shirt",
    brand: "Crazy Fashion",
    size: "L",
    color: "Brown",
    fabric: "Cotton",
    price: 499
};

console.log(shirt.shirtname);
console.log(shirt.brand);
console.log(shirt.size);
console.log(shirt.color);
console.log(shirt.fabric);
console.log(shirt.price);


// # Pant Object
let pant = {
    pantname: "Slim Fit Denim Jeans",
    brand: "Crazy Fashion",
    size: "32",
    color: "Arctic Blue",
    material: "Stretch Denim",
    price: 799
};

console.log(pant.pantname);
console.log(pant.brand);
console.log(pant.size);
console.log(pant.color);
console.log(pant.material);
console.log(pant.price);


// # Array of Shirts and Pants (using forEach like Oct 2 lesson)
let clothes = [
    { name: "Casual Floral Shirt", category: "Shirt", size: "L", price: 499 },
    { name: "Doodle Cuban Shirt", category: "Shirt", size: "M", price: 499 },
    { name: "Arctic Blue Denim Jeans", category: "Pant", size: "32", price: 799 },
    { name: "Midnight Black Trousers", category: "Pant", size: "34", price: 899 }
];

console.log("--- All Clothes ---");
clothes.forEach(item => {
    console.log(item.category + ": " + item.name + " (Size: " + item.size + ") - Rs." + item.price);
});
