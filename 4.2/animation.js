   document.addEventListener("DOMContentLoaded", function() {

        Draggable.create(".Food img", {
            type: "x,y",
            edgeResistance: 0.65,
            bounds: "body",
            inertia: true,
            onDrag: function() {
                if(this.hitTest(".Men img")) {
    TweenLite.to(this.target, 1, {opacity:0, scale:0});
                };
            }
        });

        Draggable.create("#hotdog ", {
            type: "x,y",
            edgeResistance: 0.65,
            bounds: "body",
            inertia: true,
            onDrag: function() {
                if(this.hitTest("#hotdogman ")) {
    TweenLite.to(this.target, 1, {opacity:0, scale:0});
                };
            }
        });

        Draggable.create("#burger ", {
            type: "x,y",
            edgeResistance: 0.65,
            bounds: "body",
            inertia: true,
            onDrag: function() {
                if(this.hitTest("#burgerman ")) {
    TweenLite.to(this.target, 1, {opacity:0, scale:0});
                };
            }
        });


        

        console.log("Draggable elements created");
    });
    Improve
    Ex