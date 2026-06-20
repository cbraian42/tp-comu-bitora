import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getSymbolDisplay } from '@/lib/display'

function buildTreeData(node, x = 0, y = 0, level = 0, spread = 200) {
  if (!node) return null

  const isLeaf = node.symbol !== null
  const label = isLeaf ? getSymbolDisplay(node.symbol) : ''

  const result = {
    id: `${x}-${y}-${level}`,
    label,
    frequency: node.frequency,
    isLeaf,
    x,
    y,
    children: [],
  }

  const nextSpread = spread * 0.6
  const nextY = y + 60

  if (node.left) {
    const leftChild = buildTreeData(node.left, x - spread / 2, nextY, level + 1, nextSpread)
    if (leftChild) result.children.push(leftChild)
  }

  if (node.right) {
    const rightChild = buildTreeData(node.right, x + spread / 2, nextY, level + 1, nextSpread)
    if (rightChild) result.children.push(rightChild)
  }

  return result
}

function TreeNode({ node, parentX, parentY }) {
  const nodeSize = node.isLeaf ? 36 : 28

  return (
    <g>
      {/* Línea de conexión al padre */}
      {parentX !== undefined && parentY !== undefined && (
        <line
          x1={parentX}
          y1={parentY + 14}
          x2={node.x}
          y2={node.y - nodeSize / 2}
          stroke="#334155"
          strokeWidth={2}
        />
      )}

      {/* Círculo del nodo */}
      <circle
        cx={node.x}
        cy={node.y}
        r={nodeSize / 2}
        fill={node.isLeaf ? '#38BDF8' : '#1E293B'}
        stroke={node.isLeaf ? '#38BDF8' : '#334155'}
        strokeWidth={2}
      />

      {/* Etiqueta del nodo */}
      {node.isLeaf ? (
        <text
          x={node.x}
          y={node.y + 5}
          textAnchor="middle"
          fill="#0F172A"
          fontSize="14"
          fontFamily="monospace"
          fontWeight="bold"
        >
          {node.label}
        </text>
      ) : (
        <text
          x={node.x}
          y={node.y + 4}
          textAnchor="middle"
          fill="#94A3B8"
          fontSize="10"
          fontFamily="monospace"
        >
          {node.frequency}
        </text>
      )}

      {/* Etiqueta de frecuencia para hojas */}
      {node.isLeaf && (
        <text
          x={node.x}
          y={node.y + nodeSize / 2 + 14}
          textAnchor="middle"
          fill="#94A3B8"
          fontSize="10"
          fontFamily="monospace"
        >
          {node.frequency}
        </text>
      )}

      {/* Etiquetas de rama (0 para izquierda, 1 para derecha) */}
      {node.children.map((child, index) => {
        const midX = (node.x + child.x) / 2
        const midY = (node.y + child.y) / 2
        const offsetX = child.x < node.x ? -10 : 10
        return (
          <text
            key={child.id}
            x={midX + offsetX}
            y={midY}
            textAnchor="middle"
            fill="#22C55E"
            fontSize="12"
            fontFamily="monospace"
            fontWeight="bold"
          >
            {index === 0 ? '0' : '1'}
          </text>
        )
      })}

      {/* Renderizar hijos */}
      {node.children.map((child) => (
        <TreeNode key={child.id} node={child} parentX={node.x} parentY={node.y} />
      ))}
    </g>
  )
}

export function HuffmanTree({ tree }) {
  const treeData = useMemo(() => {
    if (!tree) return null
    return buildTreeData(tree, 300, 40, 0, 250)
  }, [tree])

  if (!treeData) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="p-8 text-center text-text-secondary">
          <p>No hay árbol para mostrar</p>
        </CardContent>
      </Card>
    )
  }

  // Calcular límites
  const getAllNodes = (node) => {
    const nodes = [node]
    node.children.forEach(child => nodes.push(...getAllNodes(child)))
    return nodes
  }

  const allNodes = getAllNodes(treeData)
  const minX = Math.min(...allNodes.map(n => n.x)) - 50
  const maxX = Math.max(...allNodes.map(n => n.x)) + 50
  const maxY = Math.max(...allNodes.map(n => n.y)) + 50
  const width = maxX - minX
  const height = maxY + 20

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-display text-foreground">
          Árbol de Huffman
        </CardTitle>
        <p className="text-sm text-text-secondary">
          Los símbolos más frecuentes están más cerca de la raíz
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <svg
            width={Math.max(width, 600)}
            height={height}
            viewBox={`${minX} 0 ${width} ${height}`}
            className="mx-auto"
          >
            <TreeNode node={treeData} />
          </svg>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary" />
            <span className="text-text-secondary">Símbolo (hoja)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-card border-2 border-border" />
            <span className="text-text-secondary">Nodo interno</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-accent">0/1</span>
            <span className="text-text-secondary">Código de rama</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
