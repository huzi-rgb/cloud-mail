// 常见外国人名池,用于批量创建邮箱时生成美观的前缀
const FIRST_NAMES = [
    'james', 'john', 'robert', 'michael', 'william', 'david', 'richard', 'joseph',
    'thomas', 'charles', 'daniel', 'matthew', 'anthony', 'mark', 'steven', 'paul',
    'andrew', 'joshua', 'kenneth', 'kevin', 'brian', 'george', 'edward', 'ronald',
    'timothy', 'jason', 'jeffrey', 'ryan', 'jacob', 'nicholas', 'eric', 'jonathan',
    'stephen', 'larry', 'justin', 'scott', 'brandon', 'benjamin', 'samuel', 'gregory',
    'alexander', 'patrick', 'frank', 'raymond', 'jack', 'dennis', 'jerry', 'tyler',
    'aaron', 'henry', 'douglas', 'peter', 'adam', 'nathan', 'olivia', 'emma',
    'charlotte', 'amelia', 'sophia', 'isabella', 'mia', 'evelyn', 'luna', 'harper',
    'camila', 'sofia', 'scarlett', 'gianna', 'abigail', 'avery', 'ella', 'penelope',
    'chloe', 'victoria', 'madison', 'eleanor', 'grace', 'nora', 'riley', 'zoey',
    'hannah', 'hazel', 'lily', 'aurora', 'savannah', 'audrey', 'brooklyn', 'bella',
    'claire', 'skylar', 'lucy', 'paisley', 'everly', 'anna', 'caroline', 'nova',
    'genesis', 'emilia', 'kennedy', 'maya', 'willow', 'kinsley', 'naomi', 'aubrey'
]

const LAST_NAMES = [
    'smith', 'johnson', 'williams', 'brown', 'jones', 'garcia', 'miller', 'davis',
    'rodriguez', 'martinez', 'hernandez', 'lopez', 'gonzalez', 'wilson', 'anderson',
    'taylor', 'moore', 'jackson', 'martin', 'lee', 'perez', 'thompson', 'white',
    'harris', 'sanchez', 'clark', 'ramirez', 'lewis', 'robinson', 'walker', 'young',
    'allen', 'king', 'wright', 'scott', 'torres', 'nguyen', 'hill', 'flores',
    'green', 'adams', 'nelson', 'baker', 'hall', 'rivera', 'campbell', 'mitchell',
    'carter', 'roberts', 'gomez', 'phillips', 'evans', 'turner', 'diaz', 'parker',
    'cruz', 'collins', 'edwards', 'stewart', 'morris', 'murphy', 'cook', 'rogers',
    'gutierrez', 'ortiz', 'morgan', 'cooper', 'peterson', 'bailey', 'reed', 'kelly',
    'howard', 'ramos', 'kim', 'cox', 'ward', 'richardson', 'watson', 'brooks',
    'chavez', 'wood', 'james', 'bennett', 'gray', 'mendoza', 'ruiz', 'hughes',
    'price', 'alvarez', 'castillo', 'sanders', 'patel', 'myers', 'long', 'ross',
    'foster', 'jimenez', 'powell', 'jenkins', 'perry', 'russell', 'sullivan', 'bell'
]

function pick(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function pad2(n) {
    return String(n).padStart(2, '0')
}

// 随机外国人名前缀:james.carter;带 prefix 时:shop.james.carter
// 冲突时追加两位随机数:james.carter42
export function randomNamePrefix(prefix = '', existing = new Set()) {
    for (let i = 0; i < 50; i++) {
        let name = `${pick(FIRST_NAMES)}.${pick(LAST_NAMES)}`
        if (prefix) {
            name = `${prefix}.${name}`
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
    const fallback = `${prefix || 'user'}.${Date.now().toString(36)}`
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
