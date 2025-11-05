import React, { useState } from "react";
import { motion } from "framer-motion";
import "./MindMap.css"; // optional for better styling separation

const animalData = [
  { name: "Lion", category: "Apex Predators", image: "lion.jpg" },
  { name: "Zebra", category: "Speed Demons", image: "zebra.jpg" },
  { name: "Boar", category: "Other", image: "boar.jpg" },
  { name: "Tiger", category: "Apex Predators", image: "tiger.jpg" },
  { name: "Deer", category: "Speed Demons", image: "deer.jpg" },
  { name: "Monkey", category: "Survival Geniuses", image: "monkey.jpg" },
  { name: "Cow", category: "Other", image: "cow.jpg" },
  { name: "Leopard", category: "Apex Predators", image: "leopard.jpg" },
  { name: "Hare", category: "Speed Demons", image: "hare.jpg" },
  { name: "Mouse", category: "Tiny Survivors", image: "mouse.jpg" },
  { name: "Wolf", category: "Pack Hunters & Social Strategists", image: "wolf.jpg" },
  { name: "Rabbit", category: "Tiny Survivors", image: "rabbit.jpg" },
  { name: "Goat", category: "Other", image: "goat.jpg" },
  { name: "Sheep", category: "Other", image: "sheep.jpg" },
  { name: "Fox", category: "Stealth & Shadows", image: "fox.jpg" },
  { name: "Duck", category: "Flight Masters", image: "duck.jpg" },
  { name: "Squirrel", category: "Tiny Survivors", image: "squirrel.jpg" },
  { name: "Pigeon", category: "Flight Masters", image: "pigeon.jpg" },
  { name: "Owl", category: "Flight Masters", image: "owl.jpg" },
  { name: "Rat", category: "Tiny Survivors", image: "rat.jpg" },
  { name: "Eagle", category: "Flight Masters", image: "eagle.jpg" },
  { name: "Snake", category: "Stealth & Shadows", image: "snake.jpg" },
  { name: "Cat", category: "Stealth & Shadows", image: "cat.jpg" },
  { name: "Dog", category: "Pack Hunters & Social Strategists", image: "dog.jpg" },
  { name: "Coyote", category: "Pack Hunters & Social Strategists", image: "coyote.jpg" },
  { name: "Goose", category: "Flight Masters", image: "goose.jpg" },
  { name: "Hyena", category: "Pack Hunters & Social Strategists", image: "hyena.jpg" },
  { name: "Bear", category: "Tough Defenders", image: "bear.jpg" },
  { name: "Shark", category: "Underwater Specialists", image: "shark.jpg" },
  { name: "Seal", category: "Cold-Climate Survivors", image: "seal.jpg" },
  { name: "Goldfish", category: "Underwater Specialists", image: "goldfish.jpg" },
  { name: "Squid", category: "Underwater Specialists", image: "squid.jpg" },
  { name: "Octopus", category: "Underwater Specialists", image: "octopus.jpg" },
  { name: "Dolphin", category: "Underwater Specialists", image: "dolphin.jpg" },
  { name: "Crab", category: "Underwater Specialists", image: "crab.jpg" },
  { name: "Lobster", category: "Underwater Specialists", image: "lobster.jpg" },
  { name: "Seahorse", category: "Underwater Specialists", image: "seahorse.jpg" },
  { name: "Jellyfish", category: "Underwater Specialists", image: "jellyfish.jpg" },
  { name: "Crow", category: "Survival Geniuses", image: "crow.jpg" },
  { name: "Chimpanzee", category: "Survival Geniuses", image: "chimpanzee.jpg" },
  { name: "Bison", category: "Tough Defenders", image: "bison.jpg" },
  { name: "Insects", category: "Tiny Survivors", image: "insects.jpg" },
  { name: "Beetles", category: "Tiny Survivors", image: "beetles.jpg" },
  { name: "Bees", category: "Tiny Survivors", image: "bees.jpg" },
  { name: "Fish", category: "Underwater Specialists", image: "fish.jpg" },
  { name: "Eggs", category: "Other", image: "eggs.jpg" },
  { name: "Sparrow", category: "Flight Masters", image: "sparrow.jpg" }
];

const predatorPrey = {
  Lion: ["Antelope", "Zebra", "Boar"],
  Tiger: ["Deer", "Boar", "Monkey", "Cow"],
  Leopard: ["Antelope", "Hare", "Monkey", "Mouse"],
  Wolf: ["Deer", "Rabbit", "Goat", "Sheep", "Bison"],
  Fox: ["Mouse", "Rabbit", "Duck", "Squirrel", "Pigeon"],
  Owl: ["Mouse", "Rat", "Squirrel", "Sparrow"],
  Eagle: ["Duck", "Rabbit", "Goldfish", "Snake", "Squirrel"],
  Snake: ["Mouse", "Rat", "Eggs", "Sparrow"],
  Cat: ["Mouse", "Rat", "Squirrel", "Sparrow"],
  Dog: ["Rabbit", "Squirrel"],
  Coyote: ["Rabbit", "Mouse", "Deer", "Duck", "Goose"],
  Hyena: ["Antelope", "Zebra"],
  Bear: ["Fish", "Insects", "Beetles", "Bees", "Deer"],
  Shark: ["Seal", "Goldfish", "Squid", "Octopus"],
  Dolphin: ["Squid", "Fish", "Octopus"],
  Octopus: ["Crab", "Lobster", "Fish"],
  Crab: ["Fish"],
  Jellyfish: ["Fish"],
  Crow: ["Insects", "Eggs", "Mouse"],
  Chimpanzee: ["Insects"]
};

const categories = [
  "Tiny Survivors",
  "Survival Geniuses",
  "Other",
  "Apex Predators",
  "Tough Defenders",
  "Speed Demons",
  "Flight Masters",
  "Underwater Specialists",
  "Stealth & Shadows",
  "Pack Hunters & Social Strategists"
];

const center = { x: 600, y: 400 };
const radius = 300;

const AnimalMindMap = () => {
  const [hoveredAnimal, setHoveredAnimal] = useState(null);

  return (
    <svg width="1200" height="800" style={{ background: "#f0f4f8" }}>
      {/* Central Circle */}
      <circle cx={center.x} cy={center.y} r="80" fill="#74b9ff" />
      <text x={center.x} y={center.y} textAnchor="middle" dy=".3em" fontSize="16" fill="white">
        Animal Survival Categories
      </text>

      {/* Category Circles */}
      {categories.map((category, i) => {
        const angle = (2 * Math.PI * i) / categories.length;
        const cx = center.x + radius * Math.cos(angle);
        const cy = center.y + radius * Math.sin(angle);

        const animalsInCategory = animalData.filter(a => a.category === category);
        const spacing = 60;

        return (
          <g key={category}>
            {/* Line from center */}
            <line
              x1={center.x}
              y1={center.y}
              x2={cx}
              y2={cy}
              stroke="#ccc"
            />
            {/* Category Label */}
            <circle cx={cx} cy={cy} r="60" fill="#55efc4" />
            <text x={cx} y={cy} textAnchor="middle" dy=".3em" fontSize="14" fill="#2d3436">
              {category}
            </text>

            {/* Animal Circles */}
            {animalsInCategory.map((animal, j) => {
              const angleOffset = (j - (animalsInCategory.length - 1) / 2) * spacing;
              const animalX = cx + 90 * Math.cos(angle + Math.PI / 2) + angleOffset * Math.cos(angle);
              const animalY = cy + 90 * Math.sin(angle + Math.PI / 2) + angleOffset * Math.sin(angle);

              const isHovered = hoveredAnimal === animal.name;

              return (
                <g
                  key={animal.name}
                  onMouseEnter={() => setHoveredAnimal(animal.name)}
                  onMouseLeave={() => setHoveredAnimal(null)}
                >
                  {isHovered ? (
                    <g>
                      <rect
                        x={animalX - 50}
                        y={animalY - 50}
                        width={100}
                        height={100}
                        rx={12}
                        fill="#ffeaa7"
                        stroke="#fdcb6e"
                      />
                      <text
                        x={animalX}
                        y={animalY + 4}
                        textAnchor="middle"
                        fontSize="12"
                        fill="#2d3436"
                      >
                        {animal.name}
                      </text>
                    </g>
                  ) : (
                    <circle
                      cx={animalX}
                      cy={animalY}
                      r="20"
                      fill="#fab1a0"
                      stroke="#e17055"
                    />
                  )}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
};

export default AnimalMindMap;
