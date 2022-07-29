# TODO

## Design

- minimize core component dependencies (ideally just React and D3)
- possibly split plot into plot/plotter, graph/graphographer etc
- implement general update pattern when good case turns up
  1. bind new data
  2. remove `exit()` selection
  3. create and configure `enter()` selection
  4. `merge` new and remaining element
  5. update combined selection based on bound data

## Development

- tell linters about TypeScript
- TS infer types from usage?
- add css files
- error boundary in demo app
- wallaby in or out?
- can snapshot work for graph?
- handle reading of files in public in test context
- split out reading tsv files so that plotter can be tested directly

## Typing

- d3.extent string and number

## Introduce more data

- add Tenwise data example with pmids and twdis
- example of yarn ball / large example

## Style nodes according to data properties

- different types of nodes should have separate styling
- links thickness should reflect weight of link

## Make button labels

- labels and tooltips should work together

## Make graph zoomable (scrollable)
