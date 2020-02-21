// const input = {
//     nDays: 0,
//     books: [],
//     totScore: 0,
//     libraries: {
//         size: 0,
//         libraries: [
//             {
//                 nBooks: 0,
//                 books: [{
//                 id: 0,
//                 score: 0
//             }],
//                 sProcess: 0,
//                 nShip: 0
//             }

//         ]
//     }
// };




const fs = require('fs')
function getInputText(n) {
    return fs.readFileSync(`./input/${n}.txt`, 'utf-8');
}

function readInput(text) {
    const rows = text.split('\n');
    const [_nBooks, nLibraries, nDays] = rows[0].split(' ').map(n => +n);
    const booksScores = rows[1].split(' ').map(n => +n);
    const theBooks = booksScores.map((score, index) => ({ id: index, score }));
    const libraries = {
        size: nLibraries,
        libraries: []
    };
    let nLib = 0;
    for (let i = 2; i < rows.length - 2; i += 2) {
        const [nBooks, sProcess, nShip] = rows[i].split(' ').map(n => +n);
        const books = rows[i + 1].split(' ').map(n => +n).map(index => theBooks[index]);
        const library = {
            id: nLib,
            nBooks,
            books: books.sort((x, y) => y.score - x.score),
            totScore: books.reduce((acc, book) => acc + book.score, 0),
            sProcess,
            nShip
        };
        libraries.libraries.push(library);
        nLib++;
    }
    const input = {
        totScore: theBooks.reduce((acc, book) => acc + book.score, 0),
        books: theBooks.sort((y, x) => y.score - x.score),
        nDays,
        libraries,
        readBooks: theBooks.map(_ => false)
    };
    return input;
}

function main() {
    for (let i = 0; i < 6; i++) {
        console.log("----------------------------------- " + i);
        
        const inputText = getInputText(i);
        const input = readInput(inputText);
        const output = solve(input);
        //console.log(calc(output, input));
        fs.writeFileSync(`./${i}.txt`, output);
    }
}

function solve(input) {


    const sortedLibraries = sortLibraries(input.libraries.libraries);
    //res += sortedLibraries.map((l, i) => l.id).join(" ")
    //res += '\n';

    let libri = sortedLibraries.map((l, i) => {
        let bb = l.books.filter(b => !input.readBooks[b.id]).map(l => l.id)

        bb.forEach(b => {
            input.readBooks[b] = true
        });
        if (bb.length <= 0)
            return false;

        let r = `${l.id} ${bb.length}`
        r += "\n";
        return r + bb.join(" ");
    })

    libri = libri.filter(l => l)

    let res = libri.length + '\n';
    res += libri.join("\n");

    return res;


}

let maxSProcess = 0;
let nShip = 0;
let totScore = 0;
let avgScore = 0;
function sortLibraries(libraries) {
    maxSProcess = 0;
    nShip = 0;
    totScore = 0;
    avgScore = 0;
    libraries.forEach(l => findMax(l))
    return libraries.sort((x, y) => libScore(x) - libScore(y));
}


function findMax(l) {


    if (l.sProcess > maxSProcess)
        maxSProcess = l.sProcess;

    if (l.nShip > nShip)
        nShip = l.nShip;

    if (l.totScore > totScore)
        totScore = l.totScore;
}

function libScore(l) {
    let mille = 1000
    let result = 0;
    //result -= 50 * library.sProcess;
    //result += 15 * library.nShip;
    //result += library.totScore * 1;

    result -= ((l.sProcess * mille) / maxSProcess) * 2;
    result += ((l.nShip * mille) / nShip) * 10;
    result += ((l.totScore * mille) / totScore) * 1.5;

    return result;
}

function calc(text, input) {
    const rows = text.split('\n');
    let currDay = 0, score = 0, dead = input.nDays;
    console.log('ciao')
    for (let i = 1; i + 1 < rows.length; i += 2) {
        const [id, libSize] = rows[i].split(' ').map(n => +n);
        const libri = rows[i + 1].split(' ').map(n => +n);
        const laLib = input.libraries.libraries.find(el => el.id == id);
        currDay += laLib.sProcess;
        const giorniUtili = dead - currDay;
        const inviati = giorniUtili * laLib.nShip;
        const max = inviati > libSize ? libSize : inviati;
        score += libri.slice(0, max).reduce((acc, curr) => acc + curr, 0);
    }
    console.log('a')
    return score;
}

main()