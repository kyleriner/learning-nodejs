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

const server = http.createServer((req, res) => {
    console.log(req.url);

    const pathName = req.url

    if (pathName === '/' || pathName === '/overview' ) {
        res.end('This is the overview')
    } else if (pathName === '/product') {
        res.end('This is the product')
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('<h1>This page could not be found.</h1>')
    }

});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000')
});





