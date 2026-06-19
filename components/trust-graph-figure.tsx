import { Box } from "@chakra-ui/react";
import { FigureFrame } from "@/components/editorial";

// Fixed coordinates — a deterministic "living map" of small-business nodes with
// one highlighted warm path (You → Mutual → Prospect) routed through the graph.
const N: Record<string, [number, number]> = {
  g1: [52, 58],
  g2: [132, 36],
  g3: [214, 66],
  g4: [300, 44],
  g5: [404, 64],
  g6: [438, 150],
  g7: [356, 232],
  g8: [250, 252],
  g9: [146, 236],
  g10: [54, 150],
  g11: [322, 118],
  g12: [182, 166],
  you: [92, 184],
  mutual: [236, 128],
  prospect: [398, 182],
};

const GRAY_EDGES: [string, string][] = [
  ["g1", "g2"],
  ["g2", "g3"],
  ["g3", "g4"],
  ["g4", "g5"],
  ["g5", "g6"],
  ["g6", "g7"],
  ["g7", "g8"],
  ["g8", "g9"],
  ["g9", "g10"],
  ["g10", "g1"],
  ["g3", "g11"],
  ["g11", "g4"],
  ["g11", "g5"],
  ["g12", "g3"],
  ["g12", "g9"],
  ["g2", "g12"],
  ["g10", "you"],
  ["g9", "you"],
  ["g12", "you"],
  ["g12", "mutual"],
  ["g11", "mutual"],
  ["g6", "prospect"],
  ["g7", "prospect"],
  ["g5", "prospect"],
];

const PATH_EDGES: [string, string][] = [
  ["you", "mutual"],
  ["mutual", "prospect"],
];

const GRAY_NODES = Object.keys(N).filter((k) => k.startsWith("g"));

const PATH_LABELS: { key: string; text: string; dy: number }[] = [
  { key: "you", text: "You", dy: 22 },
  { key: "mutual", text: "Mutual", dy: -14 },
  { key: "prospect", text: "Prospect", dy: 22 },
];

const INK_LINE = "rgba(36, 24, 38, 0.13)";
const PURPLE = "#7e51b5";
const GRAY_NODE = "#c7bad6";

export function TrustGraphFigure({
  caption,
}: {
  caption?: string;
}) {
  return (
    <FigureFrame caption={caption}>
      <Box style={{ width: "100%" }}>
        <svg
          viewBox="0 0 460 280"
          width="100%"
          height="auto"
          role="img"
          aria-label="A network of small-business nodes with a highlighted warm introduction path from your company through a mutual customer to a prospect."
          style={{ display: "block" }}
        >
          {/* gray network edges */}
          {GRAY_EDGES.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={N[a][0]}
              y1={N[a][1]}
              x2={N[b][0]}
              y2={N[b][1]}
              stroke={INK_LINE}
              strokeWidth={1}
            />
          ))}

          {/* highlighted warm path */}
          {PATH_EDGES.map(([a, b]) => (
            <line
              key={`p-${a}-${b}`}
              x1={N[a][0]}
              y1={N[a][1]}
              x2={N[b][0]}
              y2={N[b][1]}
              stroke={PURPLE}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          ))}

          {/* gray nodes */}
          {GRAY_NODES.map((k) => (
            <circle key={k} cx={N[k][0]} cy={N[k][1]} r={4} fill={GRAY_NODE} />
          ))}

          {/* path nodes */}
          {PATH_LABELS.map(({ key }) => (
            <g key={key}>
              <circle cx={N[key][0]} cy={N[key][1]} r={11} fill={PURPLE} opacity={0.14} />
              <circle
                cx={N[key][0]}
                cy={N[key][1]}
                r={6.5}
                fill={PURPLE}
                stroke="#ffffff"
                strokeWidth={2}
              />
            </g>
          ))}

          {/* labels */}
          {PATH_LABELS.map(({ key, text, dy }) => (
            <text
              key={`l-${key}`}
              x={N[key][0]}
              y={N[key][1] + dy}
              textAnchor="middle"
              fontSize={11}
              fontWeight={600}
              fill="#241826"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {text}
            </text>
          ))}
        </svg>
      </Box>
    </FigureFrame>
  );
}
