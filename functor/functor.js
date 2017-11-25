var log = console.log.bind(log)

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

// var compose = function (f, g) {
//     return function (x) {
//         return f(g(x))
//     }
// }

//ES6写法
var compose = (f, g) => (x => f(g(x)))

var prop = curry(function (key, obj) {
    return obj[key]
})

var concat = curry(function (what, str) {
    return str.concat(what)
})

var match = curry(function (what, str) {
    return str.match(what)
})

var add = curry(function (addwhat, num) {
    return num + addwhat
})

var map = curry(function (f, what) {
    return what.map(f)
})

var split = curry(function (f, str) {
    return str.split(f)
})


var head = function (arr) {
    return arr[0]
}

var last = function (arr) {
    return arr[arr.length - 1]
}
//11.21添加
// //创建一个容器
// var Container=function(x) {
//     this._value=x
// }

// //根据传入的值动态生成新的对象，this._value指向这个传入的值
// Container.of=function(x) {
//     return new Container(x)
// }
// //添加函数处理传入的值
// Container.prototype.map=function(f) {
//     return Container.of(f(this._value))
// }

// log(Container.of(2).map(function(two) {
//     return two+2
// }))

// log(Container.of('hello').map(function(s) {
//     return s.toUpperCase()
// }))
// //执行顺序是从左向右的
// log(Container.of('bombs').map(concat(' away')).map(prop('length')))


//Maybe比Container多了一个判断
// var Maybe=function(x) {
//     this._value=x
// }

// Maybe.of=function(x) {
//     return new Maybe(x)
// }

// Maybe.prototype.isNothing=function() {
//     //判断传入值是否有效
//     return (this._value===null||this._value===undefined)
// }

// Maybe.prototype.map=function(f) {
//     //如果传入值有误,则返回一个_value属性为null的对象。若传入值符合要求，着按传入值生成一个新的对象
//     return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this._value))
// }

// log(Maybe.of({name:'xiaoming',age:14}).map(prop('age')).map(add(10)))
// log(Maybe.of(null))

// var withdraw=curry(function(amount,account) {
//     return account.balance>=amount?Maybe.of({balance:account.balance-amount}):Maybe.of(null)
// })

// var updata=function(f) {
//     return f
// }

// var remain=function(x) {
//     return 'Your balance is '+x.balance
// }

// var finish=compose(remain,updata)

// // var getTwenty=compose(map(finish),withdraw(20))
// // log(getTwenty({balance:200}))
// // log(getTwenty({balance:10}))


// var maybe=curry(function(x,f,m) {
//     return m.isNothing()?x:f(m._value)
// })

// var getTwenty=compose(maybe("You're broke!",finish),withdraw(20))
// log(getTwenty({balance:200}))
// log(getTwenty({ balance: 10 }))

// var Left=function(x) {
//     this._value=x
// }

// Left.of=function(x) {
//     return new Left(x)
// }

// Left.prototype.map=function(f) {
//     return this
// }

// var Right=function(x) {
//     this._value = x
// }

// Right.of=function(x) {
//     return new Right(x)
// }

// Right.prototype.map=function(f) {
//     return Right.of(f(this._value))
// }

// log(Left.of('rain').map(function (str) {
//     return 'b' + str
// }))
// log(localStorage)

var IO = function (f) {
    this.__value = f;
}
IO.of = function (x) {
    return new IO(function () {
        return x;
    })
}
IO.prototype.map = function (f) {
    //由于compose函数的性质，先执行this._value，再执行f函数
    return new IO(compose(f, this.__value))
}

// var io_window = new IO(function () { return window })
// log(io_window.map(function (win) { return win.innerWidth }))
// log(io_window.map(prop('location')).map(prop('href')).map(split('/')))

// var $=function(selector) {
//     return new IO(function () {
//         return document.querySelectorAll(selector)
//     })
// }


//让保存在this._value中的函数执行
// log(io_window.__value())
// log(io_window.map(function(win) {
//     return win.innerWidth
// }).__value())
// log($('div').map(head).map(function(div) {
//     return div.innerText
// }).__value())

var toPairs = compose(map(split('=')), split('&'))

// log(toPairs('12=23&12=31212'))
var params = compose(toPairs, last, split('?'))
