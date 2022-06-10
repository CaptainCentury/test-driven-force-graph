# TODO

## Development

* add TypeScript
* add css files

## Style nodes according to data properties

* different types of nodes should have separate styling

## Make label unselectable

[Stack overflow](https://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting)
```
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
```

```
<p>
  Selectable text.
</p>
<p class="noselect">
  Unselectable text.
</p>
```

## Make button labels

* labels should be centered on button
* labels should not spill outside circle representing nodes
* all nodes of a certain type should be equally sized (or at least size should reflect some properties of the node rather than label size)
