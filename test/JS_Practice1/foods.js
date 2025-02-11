// Sample data: an array of food categories
const foods = [
    { category: 'Fruits', items: ['Apple', 'Banana', 'Orange', 'Mango'] },
    { category: 'Vegetables', items: ['Carrot', 'Broccoli', 'Spinach', 'Potato'] },
    { category: 'Meat', items: ['Chicken', 'Beef', 'Pork', 'Lamb'] },
    { category: 'Seafood', items: ['Salmon', 'Shrimp', 'Tuna', 'Crab'] }
];

// 1. Using arrow functions to log each food category and its items
console.log(`1. Using arrow functions to log each food category and its items`);

foods.forEach(({ category, items }) => {
    console.log(`Category: ${category}`);
    console.log(`Items: ${items.join(', ')}`);
});

console.log("");
console.log("");


// 2. Using the spread operator to create a new array of all food items
console.log(`2. Using the spread operator to create a new array of all food items`);

const allItems = [
    ...foods[0].items,
    ...foods[1].items,
    ...foods[2].items,
    ...foods[3].items
];

console.log(`All Food Items: ${allItems.join(', ')}`);

console.log("");
console.log("");


// 3. Using filter to get only fruits that start with 'A'
console.log(`3. Using filter to get only fruits that start with 'A'`);

const fruitsStartingWithA = foods[0].items.filter(item => item.startsWith('A'));
console.log(`Fruits starting with 'A': ${fruitsStartingWithA.join(', ')}`);

console.log("");
console.log("");


// 4. Using map to create an array of item lengths for each category
console.log(`4. Using map to create an array of item lengths for each category`);

const itemLengths = foods.map(({ category, items }) => ({
    category,
    itemCount: items.length
}));

console.log('Item Counts by Category:');
itemLengths.forEach(({ category, itemCount }) => {
    console.log(`${category}: ${itemCount} items`);
});

console.log("");
console.log("");


// 5. Using reduce to count the total number of food items
console.log(`5. Using reduce to count the total number of food items`);

const totalItems = foods.reduce((total, { items }) => total + items.length, 0);
console.log(`Total number of food items: ${totalItems}`);

// let CategoriesCount = foods.length;
const totalCategories =  foods.reduce((total) => total + 1, 0);
console.log(`Total number of food Categories: ${totalCategories}`);

console.log("");
console.log("");


// 6. Using template literals to create a summary of food categories
console.log(`6. Using template literals to create a summary of food categories`);

const summary = foods.map(({ category, items }) => 
    `${category} has ${items.length} items: ${items.join(', ')}`
).join('\n');

console.log('Food Categories Summary:\n' + summary);