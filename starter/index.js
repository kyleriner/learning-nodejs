const fs = require('fs');
const http = require('http');
const url = require('url');



////////////////////////////////////////////
// FILES

// const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf-8');

// console.log(textIn)

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;

// fs.writeFileSync('./starter/txt/output.txt', textOut);

// console.log('File written')

// Non-Blocking, asynchronous way

// fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log('ERROR')

//     fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./starter/txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile('./starter/txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//                 console.log("Your file has been written")
//             });
//         });
//     });
// });
// console.log('Will read file!')

////////////////////////////////////////////
// SERVER
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic) {output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');}

    return output;
    
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')

const dataObject = JSON.parse(data)


const server = http.createServer((req, res) => {
    const pathName = req.url

    // Overview page
    if (pathName === '/' || pathName === '/overview' ) {
        res.writeHead(200, {'Content-type': 'text/html'});

        const cardsHtml = dataObject.map(el => replaceTemplate(tempCard, el)).join('');
        console.log(cardsHtml)
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        res.end(output);

    // Product page
    } else if (pathName === '/product') {
        res.end('This is the product');

    // API
    } else if (pathName === '/api') {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data)

    // Not found
    } else {
        res.writeHead(404, {'Content-type': 'text/html'});
        res.end('<h1>This page could not be found.</h1>')
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000')
});





