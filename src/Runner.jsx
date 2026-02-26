import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [code, setCode] = useState("Select any method and click Run ▶");
  const [output, setOutput] = useState("Output will appear here...");

  // Execute code safely
  const runCode = () => {
    let logs = [];
    const original = console.log;

    console.log = (...args) => {
      logs.push(args.join(" "));
      original(...args);
    };

    try {
      // use Function constructor instead of direct eval to satisfy the bundler
      // and avoid security/minification warnings in production
      new Function(code)();
      setOutput(logs.join("\n") || "(no console.log output)");
    } catch (err) {
      setOutput("Error: " + err.message);
    }

    console.log = original;
  };

  // All topics + methods
  const topics = [
    {
      title: "Basics",
      items: [
        { name: "var / let / const", code: `var a=10; let b=20; const c=30; console.log(a,b,c);` },
        { name: "Data types", code: `console.log(typeof 123, typeof "hi", typeof true, typeof {}, typeof []);` },
        { name: "Arithmetic", code: `console.log(5+2, 5-2, 5*2, 5/2, 5%2);` },
        { name: "Comparison (== vs ===)", code: `console.log("5"==5, "5"===5);` },
        { name: "Logical", code: `console.log(true && false, true || false, !true);` },
        { name: "Assignment", code: `let x=5; x+=3; console.log(x);` },
        { name: "typeof", code: `console.log(typeof 123, typeof "hello", typeof []);` },
        { name: "Regex .test()", code: `console.log(/abc/.test("abcdef"));` },
        { name: "document.getElementById()", code: `document.getElementById("domMsg").innerText="Text updated!";` },
      ],
    },

    {
      title: "Loops",
      items: [
        { name: "for loop", code: `for(let i=1;i<=5;i++){console.log(i);}` },
        { name: "while loop", code: `let i=1; while(i<=5){console.log(i); i++;}` },
        { name: "do-while", code: `let x=1; do{console.log(x); x++;}while(x<=3);` },
        { name: "for-of", code: `for(const ch of ["a","b","c"]){console.log(ch);}` },
        { name: "for-in", code: `const obj={a:1,b:2}; for(const k in obj){console.log(k,obj[k]);}` },
      ],
    },

    {
      title: "Number / Math",
      items: [
        { name: "Math.round()", code: `console.log(Math.round(4.7));` },
        { name: "Math.floor()", code: `console.log(Math.floor(4.7));` },
        { name: "Math.ceil()", code: `console.log(Math.ceil(4.1));` },
        { name: "Math.random()", code: `console.log(Math.random());` },
        { name: "Math.sqrt()", code: `console.log(Math.sqrt(25));` },
        { name: "Math.pow()", code: `console.log(Math.pow(2,3));` },
        { name: "Math.max / Math.min", code: `console.log(Math.max(1,5,2)); console.log(Math.min(1,5,2));` },
      ],
    },
{
  title: "Objects & Functions",
  items: [
    // OBJECTS
    { name: "Create Object", code: `const user = {name: "John", age: 25}; console.log(user);` },

    { name: "Access Properties", code: `const obj = {a: 1, b: 2}; console.log(obj.a, obj["b"]);` },

    { name: "Add / Remove Keys", code: `let obj = {a: 1}; obj.b = 2; delete obj.a; console.log(obj);` },

    { name: "Object.keys()", code: `const o = {x:1,y:2}; console.log(Object.keys(o));` },

    { name: "Object.values()", code: `const o = {x:1,y:2}; console.log(Object.values(o));` },

    { name: "Object.entries()", code: `const o = {x:1,y:2}; console.log(Object.entries(o));` },

    { name: "Spread Operator (...)", code: `const o1={a:1}; const o2={b:2}; const o3={...o1,...o2}; console.log(o3);` },

    { name: "Destructuring", code: `const user={name:"John",age:20}; const {name,age} = user; console.log(name,age);` },

    { name: "Nested Object", code: `const obj={user:{name:"Sam",address:{city:"NY"}}}; console.log(obj.user.address.city);` },

    { name: "Loop Object (for-in)", code: `const obj={a:1,b:2,c:3}; for(let k in obj){console.log(k,obj[k]);}` },

    // FUNCTIONS
    { name: "Basic Function", code: `function greet(){ console.log("Hello!"); } greet();` },

    { name: "Function with Parameters", code: `function add(a,b){ console.log(a+b); } add(5,7);` },

    { name: "Arrow Function", code: `const square = n => n*n; console.log(square(5));` },

    { name: "Default Parameters", code: `function greet(name="Guest"){ console.log("Hello",name); } greet();` },

    { name: "Rest Parameters (...)", code: `function sum(...nums){ console.log(nums.reduce((a,b)=>a+b)); } sum(1,2,3,4);` },

    { name: "Function Inside Object", code: `const obj={name:"Sam", speak(){ console.log("Hi!"); }}; obj.speak();` },

    { name: "Function Returning Function", code: `function outer(){ return function(){ console.log("Inner Function"); }; } outer()();` },
  ],
},
    {
      title: "Arrays",
      items: [
        { name: "map()", code: `console.log([1,2,3].map(x=>x*2));` },
        { name: "filter()", code: `console.log([1,2,3,4].filter(x=>x%2===0));` },
        { name: "reduce()", code: `console.log([1,2,3].reduce((a,b)=>a+b));` },
        { name: "find()", code: `console.log([5,12,8].find(x=>x>10));` },
        { name: "some()", code: `console.log([1,2,3].some(x=>x>2));` },
        { name: "every()", code: `console.log([1,2,3].every(x=>x>0));` },
        { name: "includes()", code: `console.log([1,2,3].includes(2));` },
        { name: "push/pop", code: `let a=[1,2]; a.push(3); a.pop(); console.log(a);` },
        { name: "shift/unshift", code: `let a=[2,3]; a.unshift(1); a.shift(); console.log(a);` },
        { name: "slice()", code: `console.log([1,2,3,4].slice(1,3));` },
        { name: "splice()", code: `let a=[1,2,3]; a.splice(1,1); console.log(a);` },
        { name: "sort()", code: `console.log([3,1,4,2].sort());` },
        { name: "concat()", code: `console.log([1,2].concat([3,4]));` },
      ],
    },

    {
      title: "Strings",
      items: [
        { name: "toUpperCase()", code: `console.log("hello".toUpperCase());` },
        { name: "toLowerCase()", code: `console.log("HELLO".toLowerCase());` },
        { name: "trim()", code: `console.log("  hi  ".trim());` },
        { name: "slice()", code: `console.log("HelloWorld".slice(0,5));` },
        { name: "substring()", code: `console.log("JavaScript".substring(4));` },
        { name: "replace()", code: `console.log("Hello World".replace("World","JS"));` },
        { name: "replaceAll()", code: `console.log("aa bb aa".replaceAll("aa","xx"));` },
        { name: "charAt()", code: `console.log("Hello".charAt(1));` },
        { name: "indexOf()", code: `console.log("Hello".indexOf("l"));` },
        { name: "includes()", code: `console.log("Hello".includes("He"));` },
        { name: "split()", code: `console.log("a,b,c".split(","));` },
        { name: "startsWith()", code: `console.log("JavaScript".startsWith("Java"));` },
        { name: "endsWith()", code: `console.log("JavaScript".endsWith("Script"));` },
      ],
    },

    {
      title: "DOM & Events",
      items: [
        { name: "Change Text", code: `document.getElementById("domMsg").innerText="Updated!";` },
        { name: "Change Color", code: `document.getElementById("domMsg").style.color="red";` },
        { name: "Change Background", code: `document.getElementById("domMsg").style.background="yellow";` },
        {
          name: "Add Element",
          code: `let p=document.createElement("p");
p.innerText="New Element Added!";
document.body.appendChild(p);`,
        },
        {
          name: "Remove Element",
          code: `let el=document.getElementById("domMsg");
el.remove();`,
        },
      ],
    },
  ];

  return (
    <div className="app">
      <div className="sidebar">
        {topics.map((t) => (
          <div className="topicCard" key={t.title}>
            <h3>{t.title}</h3>

            {t.items.map((item, idx) => (
              <div className="methodRow" key={idx}>
                <span>{item.name}</span>
                <button
                  className="runButton"
                  onClick={() => {
                    setCode(item.code);
                    setOutput("(click Run ▶ to execute)");
                  }}
                >
                  ▶ Play
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="main">
        <h2>JavaScript Playground</h2>

        <textarea
          className="codeEditor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button className="executeBtn" onClick={runCode}>▶ Run Code</button>

        <pre className="outputBox">{output}</pre>

        <div className="domPreview">
          <p id="domMsg">This will change during DOM demos.</p>
        </div>
      </div>
    </div>
  );
}