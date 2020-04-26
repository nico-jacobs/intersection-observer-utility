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
