# IOU (intersection observer utility)

This plugin observes elements and sets data attributes accordingly to the state.
Also, it emits a custom event every time the element comes into the viewport or leaves the viewport.

### Installing

#### install via npm

```
npm i intersection-observer-utility --save
```

And in your js

```
import Iou from 'intersection-observer-utility'

document.addEventListener('DOMContentLoaded', () => {
    const myIouInstance = new Iou();

    // initialize
    myIouInstance.init();
});

```

#### install it the old way

Just grab the file https://github.com/nico-jacobs/intersection-observer-utility/blob/master/dist/iou.js

and load it before body end tag e.g.

```
<script src="yourDomain.com/js/iou.js"></script>
```

than you can initilize it like:

```
<script>
    document.addEventListener('DOMContentLoaded', function () {

        // create instance of the plugin
        var myIouInstance = new Iou();

        // initialize
        myIouInstance.init();

    });
</script>
```


## Getting Started

If your Plugin is initialized, you need to add a selector to all the HTML elements that you want to observe.
The Default selector for that is the data attribute data-iou-trigger.

The plugin then will attach the data attributes accordingly to the position to the viewport.

| Data Attribute     | Default           | Options                                                     | Description                                                                                                                                                                                               |
| :------------      | :------------     | :------------                                               | :------------                                                                                                                                                                                             |
| data-iou-trigger   | empty             | none                                                        | Mandetory selector for the elements that should be observed                                                                                                                                               |
| data-iou-target    | not set           | any selector you want                                       | Optional, this data attribute holds an Selector of elements that should be triggerd                                                                                                                       |
| data-iou-relation  | set by the plugin | prev, next, current                                         | Marks currently triggered elements, and also marks sibling elements as previous or next                                                                                                                   |
| data-iou-visible   | set by the plugin | true, fals                                                  | Shows if element is in viewport or not                                                                                                                                                                    |
| data-iou-direction | set by the plugin | visible-top,invisible-top, visible-bottom, invisible-bottom | visible-top = element came from top<br>invisble-top = element left the viewport on the top<br>visible-bottom = element came from bottom<br>invisble-bottom = element left the viewport on the bottom side |

Now you can style the elements, based on their data-attribute values.
A Demo will follow soon.

Also, the intersection of elements will emit a custom event on the document, that you can listen to.

<strong> Example:</strong>
```
bindListener: () => {


            document.addEventListener('iouOut', ({detail}) => {
                console.log('iou animated out', detail.entryObj.target.targetEls, detail.entryObj);
            });

            document.addEventListener('iouIn', ({detail}) => {
               console.log('iou animated in', detail.entryObj.target.targetEls, detail.entryObj);
            });

    },
```


## Built With

* [js-plugin-starter-kit](https://github.com/course-one/js-plugin-starter-kit)

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

I use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

Nico Jacobs


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

This Plugin was inspired by [AOS ](https://michalsnik.github.io/aos/) Animate On Scroll Library
