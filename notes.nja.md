# Idee: 
  
  html Elemente (.myElements) die in den Viewport scrollen oder sich initial befinden, triggern eine js Funktion.
  Diese JS Funktion wird per default auf ebendies Element angewendet oder auf ein Target Element.
  
  data-iou-in="funtion"
  data-iou-out="funtion"
  data-iou-in-top="funtion"
  data-iou-in-bottom="funtion"
  data-iou-out-top="funtion"
  data-iou-out-bottom="funtion"
  


```
var myIouInstance = new Iou('.myElements', {
  customOption: '?',
});
```

## Initiale Idee ist soweit umgesetzt.

weitere Todos, intersections oberserver integrieren
data-attributes variable machen


# old readme js-plugin-starter

VanillaJS (_pure JavaScript_) plugin starter with **Webpack 4** and **Babel 7**.

# Clone this repository
```
git clone -b webpack-4-babel-7 https://github.com/thatisuday/js-plugin-starter.git [dest]
```

> Here, `dest` is your destination directory in which the boilerplate code will be copied.

# Instructions
- Use `npm install` command to install dependencies.
- Execute command `npm run start` to run webpack development server and top open preview in the browser.
- Execute command `npm run build` to create plugin distribution files in the `dist` directory.
- Tweak configuration inside `config` folder if necessary.
- Configure plugin API using [**this**](https://webpack.js.org/configuration/output/) documentation.

Also Read:
https://itnext.io/how-to-write-a-frontend-javascript-plugin-using-es6-sass-webpack-a1c6d6fdeb71

# React.js plugin development
- Install **React preset** using `npm i -D @babel/preset-react` command.
- Update `babel.config.js` file with this new preset. Follow [**these**](https://babeljs.io/docs/en/babel-preset-react) instructions.
- Update `/\.js$/` with `/\.jsx?$/` inside `webpack.config.js` to compile JavaScript files with `.jsx` extensions.
- Install React and ReactDOM using `npm i -S react react-dom` command.

# Wahrscheinlich ist das setzen der relation einfach zu Aufwendig

Versuchen einfach nur in und out zu dispatchen
