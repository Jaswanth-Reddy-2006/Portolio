"use client";

import { motion } from "framer-motion";

import CodeCanvas from "@/components/CodeCanvas";

const snippets = [
    {
        title: "AlgoScope - Binary Search",
        code: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    visualizeStep(mid, arr[mid]);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
        desc: "Interactive binary search visualization with step-by-step execution tracking."
    },
    {
        title: "Data Structures - Graph Traversal",
        code: `function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  visualizeNode(start);
  
  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      visualizeEdge(start, neighbor);
      dfs(graph, neighbor, visited);
    }
  }
  return visited;
}`,
        desc: "Depth-first search implementation with real-time visualization."
    },
    {
        title: "Sorting Algorithm - Quick Sort",
        code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivot = partition(arr, low, high);
    visualizePartition(pivot);
    quickSort(arr, low, pivot - 1);
    quickSort(arr, pivot + 1, high);
  }
  return arr;
}`,
        desc: "Efficient sorting with O(n log n) complexity visualization."
    },
    {
        title: "Machine Learning - Clustering",
        code: `import pandas as pd
from sklearn.cluster import KMeans

def optimize_yield(data):
    clusters = KMeans(n_clusters=5).fit(data)
    return data.groupby(clusters.labels_).mean()`,
        desc: "Data science approach to pattern recognition and optimization."
    }
];

export default function CodeAsArt() {

    return (
        <section id="code" className="relative min-h-screen bg-black py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 overflow-hidden">
            <CodeCanvas />
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 sm:mb-16 md:mb-20"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white">
                        Code as Art
                    </h2>
                    <p className="mt-2 sm:mt-4 text-zinc-500 tracking-widest uppercase text-xs sm:text-sm">
                        Building digital universes through logic
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 mb-10">
                    {snippets.map((snippet, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="group relative p-4 sm:p-6 md:p-8 border border-white/5 bg-zinc-900/20 backdrop-blur-sm rounded-lg hover:border-white/20 transition-all duration-500"
                        >
                            <div className="absolute -top-4 -right-4 h-16 w-16 sm:h-24 sm:w-24 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4 tracking-wider uppercase">
                                {snippet.title}
                            </h3>

                            <pre className="text-[10px] sm:text-xs md:text-sm font-mono text-zinc-400 p-3 sm:p-4 md:p-6 bg-black/40 rounded border border-white/5 overflow-x-auto">
                                <code className="block whitespace-pre-wrap leading-relaxed">
                                    {snippet.code}
                                </code>
                            </pre>

                            <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-zinc-500 italic">
                                &quot;{snippet.desc}&quot;
                            </p>

                            <div className="mt-6 sm:mt-8 flex items-center gap-2">
                                <div className="h-[1px] w-6 sm:w-8 bg-white/20 group-hover:w-8 sm:group-hover:w-12 transition-all" />
                                <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-zinc-600 group-hover:text-zinc-400">
                                    Logic Visualized
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
}
