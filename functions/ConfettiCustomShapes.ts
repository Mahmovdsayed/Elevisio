/**
 * The `ConfettiCustomShapes` function in TypeScript creates custom confetti shapes like triangle,
 * square, coin, and tree, and shoots them in intervals with varying particle counts and shapes.
 */
import confetti from "canvas-confetti";

export function ConfettiCustomShapes() {
  const scalar = 2;
  const triangle = confetti.shapeFromPath({
    path: "M0 10 L5 0 L10 10z",
  });
  const square = confetti.shapeFromPath({
    path: "M0 0 L10 0 L10 10 L0 10 Z",
  });
  const coin = confetti.shapeFromPath({
    path: "M5 0 A5 5 0 1 0 5 10 A5 5 0 1 0 5 0 Z",
  });
  const tree = confetti.shapeFromPath({
    path: "M5 0 L10 10 L0 10 Z",
  });

  const defaults = {
    spread: 360,
    ticks: 60,
    gravity: 0,
    decay: 0.96,
    startVelocity: 20,
    shapes: [triangle, square, coin, tree],
    scalar,
  };

  const shoot = () => {
    confetti({
      ...defaults,
      particleCount: 30,
    });

    confetti({
      ...defaults,
      particleCount: 5,
    });

    confetti({
      ...defaults,
      particleCount: 15,
      scalar: scalar / 2,
      shapes: ["circle"],
    });
  };

  const interval = setInterval(shoot, 500);

  setTimeout(() => clearInterval(interval), 3000);
}
