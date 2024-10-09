

document.addEventListener("DOMContentLoaded", function() {
 
    Draggable.create(".Food img", {
        type: "x,y",
        edgeResistance: 0.65,
        bounds: "body",
        inertia: true,
        onDrag: function() {
            if(this.hitTest(".Men img")) {
TweenLite.to(this.target, 1, {opacity});
            };
        }
    });

    console.log("Draggable elements created");
});
Improve
Ex