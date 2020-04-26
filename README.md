# IOU (intersection observer utility)

This plugin observes elements and sets data attributes accordingly to the state.
Also it emits a custom event every time the element comes into the viewport or leaves the viewport.

### Installing

#### install via npm

```
npm i intersection-observer-utility --save
```

And in your js 

```
import Iou from 'intersection-observer-utility'

document.addEventListener('DOMContentLoaded', () => {
    const myIouInstance = new Iou({
        elementTrigger: '[data-iou-trigger]',
    });
    // initialize
    myIouInstance.init();
});

```

#### install it the old way


```
Give an example
```


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


## Built With

* [js-plugin-starter-kit](https://github.com/course-one/js-plugin-starter-kit) 

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Nico Jacobs**


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

This Plugin was inspired by [AOS ](https://michalsnik.github.io/aos/) Animate On Scroll Library


