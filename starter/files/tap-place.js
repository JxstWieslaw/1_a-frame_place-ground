// Component that places cactus where the ground is clicked
// Declare schema first
export const tapPlaceComponent = {
  schema: {
    min: { default: 6 },
    max: { default: 10 },
  },
  init() {
    const ground = document.getElementById("ground");
    ground.addEventListener("click", (event) => {
      // Create new entity for the new object
      const newElement = document.createElement("a-entity");

      // The raycaster gives a location of the touch in the scene
      const touchPoint = event.detail.intersection.point;
      newElement.setAttribute("position", touchPoint);
      // Set random Y rotation for our touch.
      const randomYRotation = Math.random() * 360;
      newElement.setAttribute("rotation", `0 ${randomYRotation} 0`);
      //set a randomScale-the size of the gltf model is randomised at each click. Defining the size of object..based on defined property min and max
      const randomScale = Math.floor(
        Math.random() * (Math.floor(this.data.max) - Math.ceil(this.data.min)) +
          Math.ceil(this.data.min)
      );
      // make primitive inivisible
      newElement.setAttribute("visible", "false");
      // Set the scale to 0.0001 across all axes
      newElement.setAttribute("scale", "0.0001 0.0001 0.0001");
      // Set attribute to not receive shadows from the surrounding scene
      newElement.setAttribute("shadow", {
        receive: false,
      });
      // Set glft-model using the #id of the model from html.
      newElement.setAttribute("gltf-model", "#cactusModel");
      // Append the newElement onto the scene
      this.el.sceneEl.appendChild(newElement);
      // Time to animate the model once it is loaded, using model-loaded in addEventListener
      newElement.addEventListener("model-loaded", () => {
        // Once the model is loaded, we are ready to show it popping in using an animation
        // Make the element visible NOW
        newElement.setAttribute("visible", "true");
        //add the animation- scale, randomScale, easeOutElastic, 800 (duration)
        newElement.setAttribute("animation", {
          property: "scale",
          to: `${randomScale} ${randomScale} ${randomScale}`,
          easing: "easeOutElastic",
          dur: 800,
        });
      });
    });
  }, //close your init function
};
