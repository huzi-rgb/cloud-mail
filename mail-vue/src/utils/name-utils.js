// 文艺感名字池:优雅名 × 文学家姓氏,组合如 ezrawhitman、lunawilde
const FIRST_NAMES = [
    'ezra', 'silas', 'jasper', 'felix', 'oscar', 'hugo', 'levi', 'asher',
    'finn', 'rowan', 'arlen', 'orson', 'caspian', 'alastair', 'emrys', 'lorcan',
    'sebastian', 'theodore', 'augustine', 'evander', 'leander', 'orlando', 'peregrine',
    'raphael', 'benedict', 'francis', 'laurence', 'vincent', 'gabriel', 'adrian',
    'iris', 'hazel', 'ivy', 'faye', 'luna', 'stella', 'wren', 'sage',
    'aurelia', 'seraphina', 'evangeline', 'rosalie', 'juliet', 'viola', 'celeste',
    'ophelia', 'cordelia', 'mariana', 'elowen', 'aisling', 'freya', 'isolde',
    'vivienne', 'clementine', 'magnolia', 'dahlia', 'primrose', 'gwendolyn', 'maeve',
    'sylvie', 'estelle', 'linnet', 'marisol', 'rune', 'elodie', 'sonnet'
]

const LAST_NAMES = [
    'whitman', 'thoreau', 'emerson', 'hawthorne', 'wilde', 'byron', 'shelley',
    'keats', 'blake', 'milton', 'tennyson', 'browning', 'wordsworth', 'lawrence',
    'auden', 'eliot', 'frost', 'dickinson', 'plath', 'hughes', 'poe', 'dickens',
    'bronte', 'austen', 'woolf', 'kafka', 'camus', 'dumas', 'verne', 'tolstoy',
    'dostoevsky', 'rousseau', 'voltaire', 'cervantes', 'dante', 'homer', 'virgil',
    'ovid', 'horace', 'seneca', 'rilke', 'neruda', 'borges', 'tagore', 'gibran',
    'rumi', 'proust', 'flaubert', 'balzac', 'zola', 'hugo', 'merle', 'puskin',
    'lermontov', 'yesenin', 'blok', 'akhmatova', 'tsvetaeva', 'pasternak', 'roerich'
]

function pick(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function pad2(n) {
    return String(n).padStart(2, '0')
}

// 随机外国人名前缀:jamescarter(名+姓直接连写,不带点)
// 批内冲突时追加两位数字:jamescarter42
export function randomNamePrefix(prefix = '', existing = new Set()) {
    for (let i = 0; i < 50; i++) {
        let name = `${pick(FIRST_NAMES)}${pick(LAST_NAMES)}`
        if (prefix) {
            name = `${prefix}${name}`
        }
        if (!existing.has(name)) {
            existing.add(name)
            return name
        }
        let candidate = `${name}${pad2(Math.floor(Math.random() * 100))}`
        if (!existing.has(candidate)) {
            existing.add(candidate)
            return candidate
        }
    }
    const fallback = `${prefix || 'user'}${Date.now().toString(36)}`
    existing.add(fallback)
    return fallback
}

// 自定义前缀 + 序号:shop01、shop02
export function sequencePrefix(prefix, seq) {
    return `${prefix}${pad2(seq)}`
}

// 生成 count 个前缀
// mode: 'name'(随机人名)| 'seq'(自定义前缀+序号)
export function generatePrefixes({ count, prefix = '', mode = 'name' }) {
    const clean = (prefix || '').trim().toLowerCase()
    const existing = new Set()
    const result = []

    if (mode === 'seq') {
        let seq = 0
        while (result.length < count && seq < count * 100) {
            seq++
            const name = sequencePrefix(clean, seq)
            if (!existing.has(name)) {
                existing.add(name)
                result.push(name)
            }
        }
        return result
    }

    while (result.length < count) {
        result.push(randomNamePrefix(clean, existing))
    }
    return result
}

// 生成随机密码(12 位,含大小写/数字/符号)
export function randomPassword(length = 12) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&'
    let out = ''
    const arr = new Uint32Array(length)
    crypto.getRandomValues(arr)
    for (let i = 0; i < length; i++) {
        out += chars[arr[i] % chars.length]
    }
    return out
}
