import { Observable } from "rxjs";

const output = document.getElementById("output");
const button = document.getElementById("button");

function load(url: string) {
    return Observable.defer(() => {
        return Observable.fromPromise(
            fetch(url).then(response => response.json()))
            .retryWhen(retryStrategy({ attempts: 3, delay: 1500 }));
    });
}

function retryStrategy({ attempts = 4, delay = 1000 }) {
    return function (errors) {
        return errors
            .scan((acc, value) => {
                console.log(acc, value);
                return acc + 1;
            }, 0)
            .takeWhile(acc => acc < attempts)
            .delay(delay);
    }
}

function renderMovies(movies) {
    movies.forEach(movie => {
        const div = document.createElement("div");
        div.innerText = `${movie.id} - ${movie.title}`;
        output.appendChild(div);
    });
}

Observable.fromEvent(button, "click")
    .flatMap(e => load("api/movies.json"))
    .subscribe(
        movies => renderMovies(movies),
        error => console.log(`error: ${error}`),
        () => console.log("complete")
    );
