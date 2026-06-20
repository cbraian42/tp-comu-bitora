import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getSymbolDisplay } from '@/lib/display'

const COLORS = ['#38BDF8', '#22C55E', '#F97316', '#A78BFA', '#F59E0B', '#EF4444']

export function FrequencyChart({ frequencies, codeTable, maxItems = 20 }) {
  const data = frequencies.slice(0, maxItems).map((f, i) => ({
    symbol: getSymbolDisplay(f.symbol),
    frequency: f.frequency,
    probability: (f.probability * 100).toFixed(1),
    color: COLORS[i % COLORS.length],
  }))

  // Construir datos de longitud de código en el mismo orden que frecuencias
  const lengthData = codeTable
    ? frequencies.slice(0, maxItems).map((f, i) => {
        const entry = codeTable.find((c) => c.symbol === f.symbol)
        return {
          symbol: getSymbolDisplay(f.symbol),
          codeLength: entry?.codeLength ?? 0,
          code: entry?.code ?? '',
          color: COLORS[i % COLORS.length],
        }
      })
    : []

  const chartHeight = Math.max(300, data.length * 26)

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {/* Gráfico de frecuencia */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-display text-foreground">
            Frecuencia de símbolos
          </CardTitle>
          <p className="text-sm text-text-secondary">
            {frequencies.length > maxItems
              ? `Mostrando los ${maxItems} más frecuentes de ${frequencies.length} símbolos`
              : `${frequencies.length} símbolos detectados`}
          </p>
        </CardHeader>
        <CardContent>
          <div className="w-full" style={{ height: chartHeight }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
                <XAxis
                  type="number"
                  tick={{ fill: '#94A3B8', fontSize: 12 }}
                  axisLine={{ stroke: '#334155' }}
                  tickLine={{ stroke: '#334155' }}
                />
                <YAxis
                  type="category"
                  dataKey="symbol"
                  tick={{ fill: '#CBD5E1', fontSize: 12, fontFamily: 'monospace' }}
                  axisLine={{ stroke: '#334155' }}
                  tickLine={false}
                  width={30}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#F8FAFC',
                  }}
                  formatter={(value, _name, props) => [
                    `${value} veces (${props.payload.probability}%)`,
                    'Frecuencia',
                  ]}
                  labelFormatter={(label) => `Símbolo: "${label}"`}
                />
                <Bar dataKey="frequency" radius={[0, 4, 4, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de longitud de código */}
      {codeTable && codeTable.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-display text-foreground">
              Longitud de código (bits)
            </CardTitle>
            <p className="text-sm text-text-secondary">
              Bits asignados al código de cada símbolo
            </p>
          </CardHeader>
          <CardContent>
            <div className="w-full" style={{ height: chartHeight }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lengthData} layout="vertical" margin={{ left: 20, right: 20 }}>
                  <XAxis
                    type="number"
                    allowDecimals={false}
                    tick={{ fill: '#94A3B8', fontSize: 12 }}
                    axisLine={{ stroke: '#334155' }}
                    tickLine={{ stroke: '#334155' }}
                  />
                  <YAxis
                    type="category"
                    dataKey="symbol"
                    tick={{ fill: '#CBD5E1', fontSize: 12, fontFamily: 'monospace' }}
                    axisLine={{ stroke: '#334155' }}
                    tickLine={false}
                    width={30}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1E293B',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#F8FAFC',
                    }}
                    formatter={(value, _name, props) => [
                      `${value} bits (${props.payload.code})`,
                      'Longitud',
                    ]}
                    labelFormatter={(label) => `Símbolo: "${label}"`}
                  />
                  <Bar dataKey="codeLength" radius={[0, 4, 4, 0]}>
                    {lengthData.map((entry, index) => (
                      <Cell key={`len-cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
