import { useMemo } from 'react'

const KEYWORDS = new Set([
  'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'NULL', 'IS', 'IN', 'LIKE',
  'BETWEEN', 'EXISTS', 'ANY', 'ALL', 'ORDER', 'BY', 'GROUP', 'HAVING',
  'DISTINCT', 'AS', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'OUTER',
  'CROSS', 'NATURAL', 'ON', 'UNION', 'INTERSECT', 'MINUS', 'INSERT', 'INTO',
  'VALUES', 'UPDATE', 'SET', 'DELETE', 'MERGE', 'MATCHED', 'CREATE', 'REPLACE',
  'ALTER', 'DROP', 'TRUNCATE', 'TABLE', 'VIEW', 'INDEX', 'SEQUENCE', 'TRIGGER',
  'PROCEDURE', 'FUNCTION', 'PACKAGE', 'BODY', 'CONSTRAINT', 'PRIMARY', 'KEY',
  'FOREIGN', 'REFERENCES', 'UNIQUE', 'CHECK', 'DEFAULT', 'ADD', 'COLUMN',
  'CASCADE', 'GRANT', 'REVOKE', 'COMMIT', 'ROLLBACK', 'SAVEPOINT', 'DECLARE',
  'BEGIN', 'END', 'IF', 'THEN', 'ELSE', 'ELSIF', 'LOOP', 'WHILE', 'FOR',
  'EXIT', 'WHEN', 'CONTINUE', 'RETURN', 'EXCEPTION', 'RAISE', 'CURSOR',
  'OPEN', 'FETCH', 'CLOSE', 'OUT', 'INOUT', 'TYPE', 'ROWTYPE', 'BULK',
  'COLLECT', 'FORALL', 'EXECUTE', 'IMMEDIATE', 'USING', 'PRAGMA', 'OF',
  'REVERSE', 'OVER', 'PARTITION', 'START', 'CONNECT', 'PRIOR', 'WITH',
  'FIRST', 'LAST', 'ROWS', 'ONLY', 'FETCH', 'NEXT', 'OPTION',
])

const TYPES = new Set([
  'NUMBER', 'VARCHAR2', 'VARCHAR', 'CHAR', 'NCHAR', 'NVARCHAR2', 'DATE',
  'TIMESTAMP', 'BOOLEAN', 'INTEGER', 'INT', 'PLS_INTEGER', 'BINARY_INTEGER',
  'CLOB', 'BLOB', 'LONG', 'FLOAT', 'DECIMAL', 'DEC', 'REAL',
])

const FUNCS = new Set([
  'COUNT', 'SUM', 'AVG', 'MAX', 'MIN', 'NVL', 'NVL2', 'COALESCE', 'DECODE',
  'NULLIF', 'GREATEST', 'LEAST', 'SUBSTR', 'INSTR', 'LENGTH', 'REPLACE',
  'UPPER', 'LOWER', 'INITCAP', 'TRIM', 'LPAD', 'RPAD', 'CONCAT', 'ROUND',
  'TRUNC', 'MOD', 'CEIL', 'FLOOR', 'POWER', 'ABS', 'TO_CHAR', 'TO_DATE',
  'TO_NUMBER', 'SYSDATE', 'ADD_MONTHS', 'MONTHS_BETWEEN', 'NEXT_DAY',
  'LAST_DAY', 'EXTRACT', 'ROWNUM', 'ROWID', 'LEVEL', 'RANK', 'DENSE_RANK',
  'ROW_NUMBER', 'LAG', 'LEAD', 'RAISE_APPLICATION_ERROR',
])

const COLOR = {
  comment: 'text-slate-500 italic',
  string: 'text-emerald-300',
  number: 'text-amber-300',
  keyword: 'text-rose-300 font-medium',
  type: 'text-teal-300',
  fn: 'text-sky-300',
  punct: 'text-slate-400',
  plain: 'text-slate-100',
}

function tokenize(code) {
  const tokens = []
  const re =
    /(--[^\n]*|\/\*[\s\S]*?\*\/)|('(?:[^']|'')*')|(\d+(?:\.\d+)?)|([A-Za-z_][A-Za-z0-9_]*)|(\s+)|([^\s\w])/g
  let m
  while ((m = re.exec(code)) !== null) {
    if (m[1]) tokens.push(['comment', m[1]])
    else if (m[2]) tokens.push(['string', m[2]])
    else if (m[3]) tokens.push(['number', m[3]])
    else if (m[4]) {
      const up = m[4].toUpperCase()
      let cls = 'plain'
      if (KEYWORDS.has(up)) cls = 'keyword'
      else if (TYPES.has(up)) cls = 'type'
      else if (FUNCS.has(up)) cls = 'fn'
      else if (/^\s*\(/.test(code.slice(re.lastIndex))) cls = 'fn'
      tokens.push([cls, m[4]])
    } else if (m[5]) tokens.push(['ws', m[5]])
    else tokens.push(['punct', m[6]])
  }
  return tokens
}

export default function CodeBlock({ code }) {
  const tokens = useMemo(() => tokenize(code), [code])

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-slate-700/70 bg-[#1e1e2e] shadow-lg shadow-slate-900/20">
      <div className="flex items-center gap-2 border-b border-slate-700/70 bg-[#181825] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span className="ml-2 font-mono text-xs tracking-wide text-slate-500">
          scratchpad.sql
        </span>
      </div>
      <pre className="code-scroll overflow-x-auto px-5 py-4 text-left font-mono text-[13.5px] leading-relaxed">
        <code>
          {tokens.map(([cls, val], i) =>
            cls === 'ws' ? (
              val
            ) : (
              <span key={i} className={COLOR[cls]}>
                {val}
              </span>
            )
          )}
        </code>
      </pre>
    </div>
  )
}
