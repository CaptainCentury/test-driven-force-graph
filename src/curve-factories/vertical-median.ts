import { extent, median } from "d3";

export const verticalMedian = (context) => {
  return {
    lineStart: function () {
      this.data = [];
    },
    point: function (x, y) {
      this.data.push([x, y]);
    },
    lineEnd: function () {
      const xrange = extent(this.data, (d) => d[0]);
      const m = median(this.data, (d) => d[1]);

      context.moveTo(xrange[0], m);
      context.lineTo(xrange[1], m);
    },
    areaStart: undefined,
    areaEnd: undefined,
  };
};
