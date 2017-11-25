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

var compose = function (f, g) {
    return function (x) {
        return f(g(x))
    }
}

var join = curry(function (what, arr) {
    return arr.join(what)
})

var split = curry(function (what, str) {
    return str.split(what)
})

var map = curry(function (f, arr) {
    return arr.map(f)
})

var replace = curry(function (what, replacement, str) {
    return str.replace(what, replacement)
})

var toLowerCase = function (x) {
    return x.toLowerCase()
}

var toUpperCase = function (x) {
    return x.toUpperCase()
}

var head = function (x) {
    return x[0]
}

var last = function (x) {
    return x[x.length - 1]
}

var findVal = curry(function (key, obj) {
    return obj[key]
})

var findKey = function (key) {
    return key
}

var reduce = curry(function (f, x) {
    return x.reduce(f)
})

var sort = curry(function (f, x) {
    return x.sort(function (a, b) {
        return a[f] - b[f]
    })
})
var trace = curry(function (tag, x) {
    console.log(tag, x)
    return x
})
var yourName = function (x) {
    return x.name + ' is the most fast'
}
var CARS = [{
        name: "Ferrari FF",
        horsepower: 660,
        dollar_value: 700000,
        in_stock: true
    },
    {
        name: "Spyker C12 Zagato",
        horsepower: 650,
        dollar_value: 648000,
        in_stock: false
    },
    {
        name: "Jaguar XKR-S",
        horsepower: 550,
        dollar_value: 132000,
        in_stock: false
    },
    {
        name: "Audi R8",
        horsepower: 525,
        dollar_value: 114200,
        in_stock: false
    },
    {
        name: "Aston Martin One-77",
        horsepower: 750,
        dollar_value: 1850000,
        in_stock: true
    },
    {
        name: "Pagani Huayra",
        horsepower: 700,
        dollar_value: 1300000,
        in_stock: false
    }
]

function add(a, b) {
    return a + b
}

// var isInStock = compose(findVal('in_stock'), last)
// console.log(isInStock(CARS))

// var firstCarName = compose(findVal('name'), head)
// console.log(firstCarName(CARS))

// var _average = function (xs) { return reduce(add, xs) / xs.length}

// var averageDollar = compose(_average, map(findVal('dollar_value')))

// console.log(averageDollar(CARS))

// var sanitizeNames=compose(replace(' ','_'),toLowerCase)
// console.log(sanitizeNames('HELLO WORLD!'))


// var who=compose(yourName,last,sort(findKey('horsepower')))
// console.log(who(CARS))

// var makes=CARS.map(function(car) {
//     return car.name
// })
// console.log(makes)



