const LineOnHover = {
  afterDatasetsDraw: function(chart: any) {
     if (chart.tooltip._active && chart.tooltip._active.length) {
        var activePoint = chart.tooltip._active[0],
            ctx = chart.ctx,
            y_axis = chart.scales['y-axis-0'],
            x = activePoint.tooltipPosition().x,
            topY = y_axis.top,
            bottomY = y_axis.bottom;
        // draw line
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(66,66,66,0.88)';
        ctx.setLineDash([1, 0.33])
        ctx.stroke();
        ctx.restore();
     }
  }
}

export default LineOnHover;
