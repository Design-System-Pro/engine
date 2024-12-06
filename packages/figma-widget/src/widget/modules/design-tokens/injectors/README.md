1. Tokens should first be normalized and flattened
  1. This will allow to iterate over them without having to dive into an JSON tree
1. The name should follow a pattern recognizable by the figma widget
  1. pattern is usually `theme.mode.colors.type.item.state`
  1. the dots separate the hierarchy

1. While going throw the set of tokens, insert first the ones without alias
  1. This will make sure no alias fail to be injected