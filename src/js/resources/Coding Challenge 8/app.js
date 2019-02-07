// class Element{
//     constructor(name, buildYear){
//         this.name = name;
//         this.buildYear = buildYear;
//     }
// }

// class Park extends Element{
//     constructor(name, buildYear, area, numberOfTrees){
//         super(name, buildYear);
//         this.area = area;
//         this.numberOfTrees = numberOfTrees;
//     }

//     treeDensity(){
//         console.log(`\t\t${this.name} has a tree density of ${Math.floor(this.numberOfTrees / this.area)} of trees per km.`)
//     }
// }

// class Street extends Element{
//     constructor(name, buildYear, length, size = 3){
//         super(name, buildYear);
//         this.length = length;
//         this.size = size;
//     }

//     classifyStreets(){
//         let classificator = new Map();
//         classificator.set(1, 'tiny');
//         classificator.set(2, 'small');
//         classificator.set(3, 'normal');
//         classificator.set(4, 'big');
//         classificator.set(5, 'huge');
//         console.log(`\t\tThe street ${this.name} built in ${this.buildYear} is a ${classificator.get(this.size)} street.`);
//     }
// }

// // park1 = new Park('Ocean', 1989, 20, 300);
// // street1 = new Street('Yavne', 1909, 20, 2);
// // element1 = new Element('Hi', 1938);

// let allParks = [new Park('Green Park', 1987, 0.2, 215),
//                 new Park('National Park', 1894, 2.9, 3541),
//                 new Park('Oak Park', 1953, 0.4, 949)
// ];

// let allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4),
//                   new Street('Evergreen Street', 2008, 2.7, 2),
//                   new Street('4th Street', 2015, 0.8),
//                   new Street('Sunset Boulevard', 1982, 2.5, 5)
// ];

// function calc(arr){
//     let sum = arr.reduce((prev, cur) => prev + cur, 0);
//     return [sum, (sum/arr.length)];
// }

// function parkReport(p){
//     console.log('----PARKS REPORT----\n\n\tDensity:');

//     // 1. Density
//     p.forEach(cur => {
//         cur.treeDensity();
//     });
//     console.log('');

//     // 2. Average age of parks
//     console.log('\tAverage age of parks:');
//     let ages = p.map(cur => new Date().getFullYear() - cur.buildYear);
//     let [sumAges, avgAges] = calc(ages);
//     console.log(`\t\tOur ${p.length} parks have an average of ${Math.floor(avgAges)} per park.`);

//     // 3. Which park has more than 1000 trees
//     console.log('\n\t1000 trees:');
//     let parksWithMoreThanOneThousandTrees = p.map(el => el.numberOfTrees).findIndex(el => el > 1000);
//     console.log(`\t\t${p[parksWithMoreThanOneThousandTrees].name} has more than 1000 trees.`);
// };

// function streetReport(s){
//     console.log('\n----STREETS REPORT----');

//     // 4. Total length of streets
//     console.log('\n\tStreets Length:')
//     let [totalLength, avgLength] = calc(s.map(el => el.length));
//     console.log(`\t\tThe total length of all the streets is ${Math.floor(totalLength)}, while the average length is ${Math.floor(avgLength)}.`)

//     // 5. Size classification of all streets
//     console.log('\n\tClassifications:')
//     s.forEach(el => el.classifyStreets());

// };

// parkReport(allParks);
// streetReport(allStreets);