const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

const foods = [
  'Fried-Rice',
  'Fried-Noodles',
  'Salad-with-Peanut-Sauce',
  'Grilled-Skewered-Meat',
  'Coconut-Rice',
  'Fried-Chicken',
  'Beef-Rendang',
  'Chicken-Satay',
  'Fried-Tofu',
  'Ginger-Chicken',
  'Sweet-Soy-Sauce-Chicken',
  'Spicy-Fried-Rice',
  'Curry',
  'Fried-Tempeh',
  'Beef-Soup',
  'Fried-Banana',
  'Chicken-Noodle-Soup',
  'Fried-Quail-Eggs',
  'Fried-Catfish',
  'Spicy-Grilled-Fish',
  'Chicken-Noodle',
  'Vegetable-Soup',
  'Fried-Anchovies',
  'Fried-Corn-Fritters',
  'Spicy-Beef-Soup',
  'Fried-Shrimp',
  'Rice-Porridge',
  'Fried-Cassava',
  'Beef-Soup-with-Coconut-Milk',
  'Stuffed-Tofu',
  'Fried-Eggplant',
  'Grilled-Chicken',
  'Fried-Rice-Noodles',
  'Vegetable-Curry',
  'Fried-Bean-Sprouts',
  'Spicy-Grilled-Prawns',
  'Rice-Cake-in-Banana-Leaf',
  'Spicy-Shredded-Chicken',
  'Fried-Rice-Cakes',
  'Fish-Curry',
  'Chicken-Soup',
  'Fried-Mackerel',
  'Fried-Noodles-with-Gravy',
  'Vegetable-Stir-Fry',
  'Fried-Tofu-with-Sweet-Soy-Sauce',
  'Beef-Stew',
  'Fried-Salted-Fish',
  'Fish-Soup',
  'Fried-Omelette',
  'Coconut-Soup',
  'Fried-Rice-Cake-with-Egg',
  'Beef-Ribs-Soup',
  'Fried-Squid',
  'Chicken-Porridge',
  'Fried-Soy-Cake',
  'Spicy-Grilled-Chicken',
  'Shrimp-Fried-Rice',
  'Fried-Duck',
  'Fried-Noodles-with-Egg',
  'Vegetable-Curry-Soup',
  'Fried-Mushrooms',
  'Grilled-Fish',
  'Fried-Vermicelli',
  'Beef-Stir-Fry',
  'Spicy-Fried-Chicken',
  'Fried-Beancurd-Skin',
  'Meatball-Soup',
  'Fried-Carp',
  'Fried-Beehoon',
  'Pumpkin-Soup',
  'Fried-Potato',
  'Fish-Curry-Soup',
  'Fried-Tempeh-with-Spices',
  'Chicken-Padang',
  'Fried-Snapper',
  'Fried-Rice-Noodles-with-Seafood',
  'Vegetable-Stew',
  'Fried-Petai',
  'Grilled-Squid',
  'Fried-Shredded-Chicken',
  'Chicken-Curry',
  'Fried-Shrimp-Cakes',
  'Rice-and-Beef-Roulade',
  'Spicy-Fried-Noodles',
  'Fried-Beef',
  'Shrimp-Soup',
  'Fried-Dumplings',
  'Vegetable-Curry-with-Coconut-Milk',
  'Fried-Prawn-Crackers',
  'Fried-Chicken-Wings',
  'Fried-Mutton',
  'Fish-Ball-Soup',
  'Fried-Tofu-with-Spices',
  'Chicken-Pecel',
  'Fried-Snakehead-Fish',
  'Fried-Flat-Rice-Noodles',
  'Vegetable-Stir-Fry-with-Tofu',
  'Fried-Calamari',
  'Coconut-Rice-with-Fried-Chicken',
  'Fried-Rice-Cakes-with-Shrimp',
  'Fried-Chicken-Legs',
  'Fried-Beef-with-Spices',
  'Shrimp-Curry',
  'Fried-Crispy-Noodles',
  'Vegetable-Curry-with-Tofu',
  'Fried-Sea-Bass',
  'Chicken-Curry-Soup',
  'Fried-Meatballs',
  'Fried-Mushroom-Balls',
];
//each page there are 100 foods


const pages_to_scrape = 1;
for (const food of foods)
{
    if(pages_to_scrape == 0) return;
    for(let page = 1; page <= pages_to_scrape; page++)
    {
      if(page>1)
      {
        await page.goto(`https://www.istockphoto.com/id/foto-foto/${food}&page=${page}`, {waitUntil: "domcontentloaded"});
      }
      else
      {
        await page.goto(`https://www.istockphoto.com/id/foto-foto/${food}`, {waitUntil: "domcontentloaded"});
      }

      // Extract image URLs from the search results page
      const imageUrls = await page.$$eval('img', (images) =>
        images.map((img) => img.src)
      );

      // Create a directory to save the downloaded images
      const directory = `./DatasetScraper/downloaded_images/${food}`;
      fs.mkdirSync(directory, { recursive: true });

      // Download and save the images
      for (let i = 0; i < imageUrls.length; i++) {
        const imageUrl = imageUrls[i];
        const imageFileName = `image_${i}.jpg`;
        const imagePath = `${directory}/${imageFileName}`;

        const imageResponse = await axios({
          method: 'GET',
          url: imageUrl,
          responseType: 'stream',
        });

        const imageStream = imageResponse.data;
        const imageFile = fs.createWriteStream(imagePath);
        imageStream.pipe(imageFile);

        console.log(`Downloading ${imageFileName}...`);
      }

      console.log('Images downloaded successfully!');
    }

    }
  await browser.close();
})();
