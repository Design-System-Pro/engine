export interface DesignToken {
  [category: string]: {
    [type: string]: {
      [item: string]: {
        [subItem: string]: {
          [state: string]: {
            value: string;
            [attributes: string]: string;
          };
        };
      };
    };
  };
}
