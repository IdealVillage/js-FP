function curry(fx) {
    var arity = fx.length

    return function f1() {
        var args = [].slice.call(arguments, 0)
        if (args.length >= arity) {
            return fx.apply(null, args)
        } else {
            var f2 = function () {
                var args2 = [].slice.call(arguments, 0)
                return f1.apply(null, args.concat(args2))
            }
            return f2
        }
    }
}
var match = curry(function (what, str) {
    return str.match(what)
})

var replace = curry(function (what, replacement, str) {
    return str.replace(what, replacement)
})

var filter = curry(function (f, arr) {
    return arr.filter(f)
})

var map = curry(function (f, arr) {
    return arr.map(f)
})

var split = curry(function (what, str) {
    return str.split(what)
})

var reduce = curry(function (f, arr) {
    return arr.reduce(f)
})

var slice = curry(function (start, end, str) {
    return str.slice(start, end)
})

// var hasSpace=match(/\s+/g)
// console.log(hasSpace('hello world'))

// var noVowels = replace(/[aeiou]/ig)

// var censored=noVowels("*")

// console.log(censored("Chocolate Rain"))
var word = split(' ')
console.log(word('a d w'))
var sentences = map(word)
console.log(sentences(['a d w', 'ads fe ', 'erfe rg sef']))

var filterQs = filter(match(/q/i))
console.log(filterQs(['sq', 'ss', 'fq']))

var max = (pre, cur) => {
    return Math.max(pre, cur)
}

var whoMax = reduce(max)
console.log(whoMax([1, 2, 3, 4, 43, 5, 2, 3, 4]))

var take = slice(0, 2)
console.log(take('klmy'))