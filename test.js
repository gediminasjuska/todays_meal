localStorage.clear()
undefined
localStorage.setItem("WishList", JSON.stringify(myArr))
undefined
localStorage
Storage {WishList: "[{"id":555,"instructions":"go home now"}]", length: 1}
let newpage = [{id = 444: inst: "go out"}]
VM1540:1 Uncaught SyntaxError: Unexpected token ':'
let newpage = [{id:444, inst: "go out"}]
undefined
myArr.push(newpage)
2
console.log(myArr)
VM1687:1 (2) [{…}, Array(1)]0: {id: 555, instructions: "go home now"}1: [{…}]length: 2__proto__: Array(0)
undefined
newpage = {id:464, inst: "go out"}
{id: 464, inst: "go out"}
myArr.push(newpage)
3
console.log(myArr)
VM1725:1 (3) [{…}, Array(1), {…}]0: {id: 555, instructions: "go home now"}1: [{…}]2: {id: 464, inst: "go out"}length: 3__proto__: Array(0)
undefined
localStorage
Storage {WishList: "[{"id":555,"instructions":"go home now"}]", length: 1}
localStorage.set
undefined
localStorage.setItem("WishList", JSON.stringify(myArr))

localStorage
Storage {WishList: "[{"id":555,"instructions":"go home now"},[{"id":444,"inst":"go out"}],{"id":464,"inst":"go out"}]", length: 1}WishList: "[{\"id\":555,\"instructions\":\"go home now\"},[{\"id\":444,\"inst\":\"go out\"}],{\"id\":464,\"inst\":\"go out\"}]"length: 1__proto__: Storage
let bandymas = localStorage.getItem("WishList")

console.log(bandymas)
VM1963:1 [{"id":555,"instructions":"go home now"},[{"id":444,"inst":"go out"}],{"id":464,"inst":"go out"}]
