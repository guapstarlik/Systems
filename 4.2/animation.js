

    document.addEventListener("DOMContentLoaded", function() {
    
        Draggable.create(".Food ", {
            type: "x,y",
            edgeResistance: 0.65,
            bounds: "body",
            inertia: true,
            onDrag: function() {
                // Check collision with all men
                var men = document.querySelectorAll('.Men');
                for (var i = 0; i < men.length; i++) {
                    if (this.hitTest(men[i])) {
                        // If it's the correct pair, make the food disappear
                        if ((this.target.id === "burger" && men[i].id === "burgerman") ||
                            (this.target.id === "hotdog" && men[i].id === "hotdogman") ||
                            (this.target.classList.contains("Food") && men[i].id === "foodman")) {
                            TweenLite.to(this.target, 1, {opacity: 0, scale: 0});
                            break;
                        }
                    }
                }
            }
        });
        console.log("Draggable elements created");
    });
    Improve
    Ex