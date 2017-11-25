//小小的总结
var log=console.log.bind(console)
//柯里函数实质：传递给函数一部分参数来调用它，让它返回一个参数来处理剩余参数
function curry(fx) {
    //要进行柯里化的函数的形参数量
    var arity=fx.length
    return function f1() {
        //第一次传入的参数数量
        var args=[].slice.call(arguments,0)
        //若传入的参数数量大于等于形参数量,代表现在万事俱备（参数齐全了），可以直接执行函数了,直接将参数全部传入fx函数中，并执行它
        if (args.length>=arity) {
            return fx.apply(null,args)
        }else{
            var f2=function() {
                //如果只传入了一部分参数
                var args2 = [].slice.call(arguments, 0)
                //判断是否所有参数都传完了，如果没有，不断concat新传的参数，然后执行f1函数
                return f1.apply(null, args.concat(args2))
            }
            return f2
        }

    }
}


var compose=(f,g)=>(x=>f(g(x)))


//柯里实例
// var add=x=>(y=>x+y)//为了更贴切函数式编程，这里用了ES6的写法,等价于下面的函数
// var add=function (x) {
//     return function(y) {
//         return x+y
//     }
// }
// var add2=add(2)
// console.log(add2(1))
//3

//PointFree（永远不要创建转瞬即逝的中间变量）

// var toUpperCase = str => str.toUpperCase();
// var split = curry(function (f, str) {
//     return str.split(f)
// })


// var f = compose(split(' '), toUpperCase);
// log(f('abcd efgh'))

//容器
var Container=function(x) {
    this._value=x
}

Container.of=x=>new Container(x)

Container.prototype.map=function(f) {
    //通过Container.of将值传入容器后，提供一个接口让外部的函数也能作用到容器中的值
    return Container.of(f(this._value))
}

// log(Container.of(1))
// log(Container.of(3).map(x=>x+1).map(x=>'Result is '+x))

//赋予检查空值的特性.Maybe
var Maybe=function(x) {
    this._value=x
}

Maybe.of=function(x) {
    return new Maybe(x)
}

Maybe.prototype.map=function(f) {
    return this.isNothing()?Maybe.of(null):Maybe.of(f(this._value))
}

Maybe.prototype.isNothing=function() {
    return (this._value===null||this._value===undefined)
}

var prop = curry(function (key, obj) {
    return obj[key]
})

// var map=curry((f,functor)=>functor.map(f))

// var doEverything=map(compose(add(10),prop('age')))
// var functor = Maybe.of({ name: "Stark", age: 21 })
// log(doEverything(functor))

//错误处理Either:
//运行正确，就返回正确的结果。如果错误就返回一个用于描述错误的结果
// var Left=function(x) {
//     this._value=x
// }

// var Right=function(x) {
//     this._value=x
// }

// Left.of=function(x) {
//     return new Left(x)
// }

// Right.of=function(x) {
//     return new Right(x)
// }
//left直接抛出容器，可以传递错误信息
// Left.prototype.map=function(f) {
//     return this
// }

// Right.prototype.map=function(f) {
//     return Right.of(f(this._value))
// }

// var getAge=user=>user.age?Right.of(user.age):Left.of('Error')
// log(getAge({name:'xiaoming',age:18}).map(age=>'Age is '+age))
// log(getAge({name:'daming'}).map(age=>'Age is '+age))

//不可避免要接触外部世界，所以引入了IO

var IO=function(f) {
    this._value=f
}

IO.of=x=>new IO(()=>x)
//IO将不纯的操作包到函数里
IO.prototype.map=function(f) {
    return new IO(compose(f,this._value))
}
//IO中_value并没有执行，只是将想要进行的操作存了起来，这叫做惰性求值
//函数保持纯粹，将不纯的操作留给调用者

var split = curry((char, str) => str.split(char));
// 数组
var first = arr => arr[0];
var last = arr => arr[arr.length - 1];
var filter =curry((f, arr) => arr.filter(f));
//注意这里的 x 既可以是数组，也可以是 functor
var map = curry((f, x) => x.map(f));
// 判断
var eq = curry((x, y) => x == y);
// 结合


var toPairs = compose(map(split('=')), split('&'));

var params = compose(toPairs, last, split('?'));

var join = x => x.join();
IO.prototype.join = function () {
    return this._value ? IO.of(null) : this._value();
}

// 试试看
var foo = IO.of(IO.of('123'));

log(foo.join())


