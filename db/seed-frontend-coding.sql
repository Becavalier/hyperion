INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES

(
  'Implement useDebounceValue',
  'Implement a React hook useDebounceValue(value, wait) that delays updating the returned value until the input has stopped changing for `wait` ms. Should throw TypeError for invalid wait. Initial value should be returned without debounce.',
  'frontend', 'medium',
  ARRAY['hooks','debounce','useEffect'],
  $$const useDebounceValue = (value, wait) => {
    if (typeof wait !== 'number' || wait < 0) throw new TypeError()
    const [v, setV] = useState(value)  // 初始值没有 debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setV(value)
        }, wait)
        return () => clearTimeout(timer)
    }, [value, wait])
    return v
}$$
),

(
  'Implement useDebounceFn',
  'Implement useDebounceFn(fn, wait) that returns a debounced version of fn. The returned function should return a Promise — pending calls are rejected with an Error("debounced") when superseded. The fn ref should stay current across renders.',
  'frontend', 'hard',
  ARRAY['hooks','debounce','Promise','useRef','useCallback'],
  $$const useDebounceFn = (fn, wait) => {
    const fnRef = useRef(fn)
    const timer = useRef(null)
    const lastReject = useRef(null)

    useEffect(() => { fnRef.current = fn }, [fn])
    useEffect(() => { return () => clearTimeout(timer.current) }, [])

    return useCallback((...args) => {
        clearTimeout(timer.current)
        lastReject.current?.(new Error('debounced'))
        return new Promise((resolve, reject) => {
            lastReject.current = reject
            timer.current = setTimeout(() => {
                try { return resolve(fnRef.current(...args)) }
                catch(e) { return reject(e) }
            }, wait)
        })
    }, [wait])
}$$
),

(
  'Implement useRef (simulation)',
  'Simulate React''s useRef using only useState. The returned object must have a stable reference across re-renders and a mutable .current property.',
  'frontend', 'easy',
  ARRAY['hooks','useRef','useState'],
  $$function useRef(initVal) {
    // useState 保证对象引用在组件生命周期内稳定
    const [ref] = useState({ current: initVal })
    return ref
}$$
),

(
  'Implement usePrevious',
  'Implement usePrevious(val) that returns the value from the previous render. On first render it should return undefined.',
  'frontend', 'easy',
  ARRAY['hooks','useRef','useEffect'],
  $$const usePrevious = (val) => {
    const ref = useRef(undefined)
    useEffect(() => {  // executes on commit — after render
        ref.current = val  // updated but returned in next render
    }, [val])
    return ref.current
}$$
),

(
  'Implement useThrottleValue',
  'Implement useThrottleValue(value, wait) with both leading and trailing execution: fire immediately when the delay has passed (leading), and ensure the last update always runs after the delay (trailing).',
  'frontend', 'medium',
  ARRAY['hooks','throttle','useEffect','useRef'],
  $$const useThrottleValue = (value, wait) => {
    if (typeof wait !== 'number' || wait < 0) throw new TypeError()
    const [throttledValue, setThrottledValue] = useState(value)
    const lastRun = useRef(0)
    const timer = useRef(null)

    useEffect(() => { return () => clearTimeout(timer.current) }, [])

    useEffect(() => {
        clearTimeout(timer.current)
        const now = Date.now()
        if (now - lastRun.current >= wait) {
            // leading: execute immediately if delay passed
            lastRun.current = now
            setThrottledValue(value)
        } else {
            // trailing: ensure the last update runs after delay
            timer.current = setTimeout(() => {
                lastRun.current = Date.now()
                setThrottledValue(value)
            }, wait - (now - lastRun.current))
        }
    }, [value, wait])
    return throttledValue
}$$
),

(
  'Implement useThrottleFn',
  'Implement useThrottleFn(fn, wait) returning a throttled function that returns a Promise. Superseded calls should be rejected with Error("throttled"). Must support both leading and trailing execution.',
  'frontend', 'hard',
  ARRAY['hooks','throttle','Promise','useRef','useCallback'],
  $$function useThrottleFn(func, wait) {
    const lastRun = useRef(0)
    const timer = useRef(null)
    const fn = useRef(func)
    const lastReject = useRef(null)

    useEffect(() => { fn.current = func }, [func])
    useEffect(() => { return () => clearTimeout(timer.current) }, [])

    return useCallback((...args) => {
        clearTimeout(timer.current)
        lastReject.current?.(new Error('throttled'))
        const now = Date.now()
        return new Promise((resolve, reject) => {
            lastReject.current = reject
            if (now - lastRun.current > wait) {
                lastRun.current = now
                try { return resolve(fn.current(...args)) }
                catch(e) { return reject(e) }
            } else {
                timer.current = setTimeout(() => {
                    lastRun.current = Date.now()
                    try { return resolve(fn.current(...args)) }
                    catch(e) { return reject(e) }
                }, wait - (now - lastRun.current))
            }
        })
    }, [wait])
}$$
),

(
  'Implement useAsync',
  'Implement useAsync(asyncFn) returning { data, loading, error, run }. Calling run(...args) executes asyncFn and updates state. Concurrent calls should cancel the previous one (stale result ignored). Cleanup on unmount.',
  'frontend', 'hard',
  ARRAY['hooks','async','cancellation','useCallback','useRef'],
  $$const useAsync = (asyncFn) => {
    const cancelRef = useRef(null)
    const fnRef = useRef(asyncFn)
    const [state, setState] = useState({ data: null, loading: false, error: null })

    useEffect(() => { fnRef.current = asyncFn }, [asyncFn])
    useEffect(() => { return () => cancelRef.current?.() }, [])

    const run = useCallback((...args) => {
        cancelRef.current?.()
        let cancelled = false
        cancelRef.current = () => { cancelled = true }
        setState(prev => ({ ...prev, loading: true, error: null }))

        const promise = new Promise((resolve, reject) => {
            try {
                const res = fnRef.current(...args)
                if (res instanceof Promise) res.then(resolve, reject)
                else resolve(res)
            } catch(e) { reject(e) }
        })
        return promise
            .then(res => {
                if (!cancelled) setState({ data: res, loading: false, error: null })
                return res
            })
            .catch(err => {
                if (!cancelled) setState(prev => ({ ...prev, loading: false, error: err }))
                throw err
            })
    }, [])

    return { ...state, run }
}$$
),

(
  'Implement useClickOutside',
  'Implement useClickOutside(ref, handler) that calls handler whenever a mousedown event occurs outside the element referenced by ref. Handler ref should stay current. Useful for closing dropdowns/modals.',
  'frontend', 'medium',
  ARRAY['hooks','event','DOM','useEffect','useRef'],
  $$const useClickOutside = (ref, handler) => {
    const handlerRef = useRef(handler)
    useEffect(() => { handlerRef.current = handler }, [handler])

    useEffect(() => {
        const gauge = evt => {
            if (ref.current && !ref.current.contains(evt.target))
                handlerRef.current(evt)
        }
        document.addEventListener('mousedown', gauge)
        return () => document.removeEventListener('mousedown', gauge)
    }, [])
}$$
),

(
  'Implement Modal with createPortal',
  'Implement a Modal component using ReactDOM.createPortal that renders into document.body. Props: isOpen, onClose, title, children. Clicking outside the modal content should close it (use useClickOutside).',
  'frontend', 'medium',
  ARRAY['portal','modal','createPortal','useClickOutside','DOM'],
  $$import { createPortal } from 'react-dom'

function Modal({ isOpen, onClose, children, title }) {
    const ref = useRef(null)
    useClickOutside(ref, onClose)

    return isOpen && createPortal(
        <div className="overlay">
            <div className="modal" ref={ref}>
                <div className="header">
                    {title && <span>{title}</span>}
                    <button onClick={onClose}>X</button>
                </div>
                <div className="content">{children}</div>
            </div>
        </div>,
        document.body
    )
}$$
),

(
  'Implement useIntersectionObserver',
  'Implement useIntersectionObserver(ref, options) that returns a boolean isVisible indicating whether the referenced element is in the viewport. Options: threshold, root, rootMargin.',
  'frontend', 'medium',
  ARRAY['hooks','IntersectionObserver','useEffect','viewport'],
  $$function useIntersectionObserver(ref, options) {
    const { threshold = .1, root, rootMargin } = options || {}
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting)
        }, { threshold, root, rootMargin })

        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [threshold, root, rootMargin])

    return isVisible
}$$
),

(
  'Implement Infinite Scroll',
  'Implement an InfiniteScroll component that loads paginated data as the user scrolls. Use a sentinel element + useIntersectionObserver to detect scroll-to-bottom. Track cursor for next page. Avoid duplicate fetches.',
  'frontend', 'hard',
  ARRAY['IntersectionObserver','cursor-pagination','async','useRef','infinite-scroll'],
  $$export default function InfiniteScroll() {
    const [items, setItems] = useState([])
    const nextCursor = useRef(undefined)  // undefined=初始, string=下一页, null=无更多
    const sentinel = useRef(null)
    const isVisible = useIntersectionObserver(sentinel, { threshold: .2 })
    const { loading, run } = useAsync(request)

    useEffect(() => {
        if (!isVisible || loading || nextCursor.current === null) return
        run(nextCursor.current).then(({ data, cursor }) => {
            setItems(prev => [...prev, ...data])
            nextCursor.current = cursor
        })
    }, [isVisible, loading])

    return (
        <div>
            {items.map(item => <div key={item.id}>{item.content}</div>)}
            {nextCursor.current === null
                ? <div>No more data</div>
                : <div ref={sentinel}>{loading ? 'Loading...' : 'Scroll to load more'}</div>
            }
        </div>
    )
}$$
),

(
  'Implement useForm',
  'Implement useForm({ initialValues, validate, onSubmit }) returning { values, errors, touched, handleChange, handleBlur, handleSubmit }. Validation runs on blur and submit. Only show errors for touched fields.',
  'frontend', 'hard',
  ARRAY['hooks','form','validation','controlled','onBlur'],
  $$function useForm({ initialValues, validate, onSubmit }) {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues(v => ({ ...v, [name]: value }))
    }

    const handleBlur = (e) => {
        const { name } = e.target
        setTouched(t => ({ ...t, [name]: true }))
        setValues(v => {  // handleChange 和 handleBlur 可能在同一事件序列里触发
            setErrors(validate(v))
            return v
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errs = validate(values)
        setErrors(errs)
        if (Object.keys(errs).length === 0) onSubmit(values)
    }

    return { values, errors, touched, handleChange, handleBlur, handleSubmit }
}$$
),

(
  'Implement Tabs with fade animation',
  'Implement a Tabs component with fade-out/fade-in CSS animation when switching tabs. Switching should wait for the fade-out to finish before showing the new content. Prevent interaction during animation.',
  'frontend', 'medium',
  ARRAY['animation','CSS','onAnimationEnd','state','useRef'],
  $$function Tabs({ tabs }) {
    const [active, setActive] = useState(0)
    const nextIdxRef = useRef(null)
    const [isAnimating, setIsAnimating] = useState(false)

    const toggle = (idx) => () => {
        if (isAnimating || idx === active) return
        setIsAnimating(true)  // 先触发 fade-out
        nextIdxRef.current = idx
    }

    const handleAnimationEnd = () => {
        if (!isAnimating || nextIdxRef.current === null) return
        setActive(nextIdxRef.current)   // 切换内容
        setIsAnimating(false)           // 触发 fade-in
    }

    return (
        <div>
            <div>{tabs.map((tab, idx) => <button key={idx} onClick={toggle(idx)}>{tab.label}</button>)}</div>
            <div
                className={isAnimating ? 'fade-out' : 'fade-in'}
                onAnimationEnd={handleAnimationEnd}>
                {tabs[active]?.desc}
            </div>
        </div>
    )
}

/* CSS
.fade-out { animation: fadeOut ease-out .2s forwards; }
.fade-in  { animation: fadeIn  ease-in  .2s forwards; }
@keyframes fadeOut { from { opacity:1; transform:translateY(4px) } to { opacity:0; transform:translateY(0) } }
@keyframes fadeIn  { from { opacity:0; transform:translateY(0) } to { opacity:1; transform:translateY(4px) } }
*/$$
),

(
  'Implement Virtual List (fixed height)',
  'Implement a VirtualList component that only renders visible items for a large dataset. Each item has a fixed height. Support overscan. Use requestAnimationFrame to throttle scroll events.',
  'frontend', 'hard',
  ARRAY['virtualization','performance','rAF','scroll','fixed-height'],
  $$function VirtualList({ data, itemHeight = 50, height = 400, overscan = 5 }) {
    const [scrollTop, setScrollTop] = useState(0)
    const totalHeight = data.length * itemHeight
    const visibleCount = Math.ceil(height / itemHeight)
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
    const endIndex = Math.min(data.length, startIndex + visibleCount + overscan * 2)
    const offsetY = startIndex * itemHeight

    const ticking = useRef(false)
    const scrollTopRef = useRef(0)
    const handleScroll = (e) => {
        scrollTopRef.current = e.target.scrollTop
        if (ticking.current) return
        ticking.current = true
        requestAnimationFrame(() => {
            setScrollTop(scrollTopRef.current)
            ticking.current = false
        })
    }

    return (
        <div onScroll={handleScroll} style={{ height, overflow: 'auto' }}>
            <div style={{ height: totalHeight, position: 'relative' }}>
                <div style={{ transform: `translateY(${offsetY}px)` }}>
                    {data.slice(startIndex, endIndex).map((item, i) => (
                        <div key={startIndex + i} style={{ height: itemHeight }}>{item}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}$$
),

(
  'Implement AutoComplete',
  'Implement an AutoComplete input component. Fetch suggestions as the user types using a debounced async search. Show a loading state, a suggestions list, and a "no results" message. Clicking a suggestion fills the input.',
  'frontend', 'medium',
  ARRAY['debounce','async','controlled-input','suggestions','useDebounceFn'],
  $$export default function AutoComplete() {
    const [query, setQuery] = useState('')
    const { data: list = [], loading, run } = useAsync(searchData)
    const debouncedRun = useDebounceFn(run, 300)

    const handleInputChange = (e) => {
        const v = e.target.value
        setQuery(v)
        if (v) debouncedRun(v)
    }

    return (
        <div>
            <input value={query} onChange={handleInputChange} />
            {loading && <div>Loading...</div>}
            {!loading && list.length > 0 && (
                <ul>
                    {list.map(item => (
                        <li key={item} onClick={() => setQuery(item)}>{item}</li>
                    ))}
                </ul>
            )}
            {!loading && query && list.length === 0 && <div>No results</div>}
        </div>
    )
}$$
),

(
  'Implement Drag & Drop Reorder List',
  'Implement a list where items can be reordered by dragging. Highlight the current drop target. Use only native HTML drag-and-drop events (no libraries).',
  'frontend', 'medium',
  ARRAY['drag-and-drop','dragstart','dragover','onDrop','array'],
  $$function App() {
    const [list, setList] = useState(['A', 'B', 'C'])
    const [dragIndex, setDragIndex] = useState(null)
    const [dragOverIndex, setDragOverIndex] = useState(null)

    const handleDrop = (dropIndex) => {
        if (dragIndex === null) return
        const newList = [...list]
        const [item] = newList.splice(dragIndex, 1)
        newList.splice(dropIndex, 0, item)
        setList(newList)
        setDragIndex(null)
        setDragOverIndex(null)
    }

    return (
        <div>
            {list.map((item, idx) => (
                <div
                    key={item}
                    draggable
                    style={{ background: dragOverIndex === idx && dragIndex !== idx ? 'red' : 'black' }}
                    onDragStart={() => setDragIndex(idx)}
                    onDragLeave={() => setDragOverIndex(null)}
                    onDragOver={(e) => { e.preventDefault(); if (dragOverIndex !== idx) setDragOverIndex(idx) }}
                    onDrop={() => handleDrop(idx)}
                >
                    {item}
                </div>
            ))}
        </div>
    )
}$$
),

(
  'Implement Tree View (recursive component)',
  'Implement a TreeView from a nested data structure. Each node can have children. Clicking a folder node toggles its children open/closed. Leaf nodes are not expandable. Indent by depth.',
  'frontend', 'medium',
  ARRAY['recursion','component','nested','tree','useState'],
  $$function TreeNode({ node, depth }) {
    const [open, setOpen] = useState(false)
    const hasChildren = node.children?.length

    return (
        <div>
            <div
                onClick={() => hasChildren && setOpen(o => !o)}
                style={{ paddingLeft: depth * 16, cursor: hasChildren ? 'pointer' : 'default' }}
            >
                {hasChildren && (open ? '▼ ' : '▶ ')}
                {node.label}
            </div>
            {open && hasChildren && node.children.map(child => (
                <TreeNode key={child.id} node={child} depth={depth + 1} />
            ))}
        </div>
    )
}

export default function App() {
    return data.map(node => <TreeNode key={node.id} node={node} depth={0} />)
}$$
),

(
  '事件委托 (Event Delegation)',
  '解释事件委托的原理并用原生 JS 实现一个示例：给一个动态列表 <ul> 的父元素绑定单个 click 监听器，通过 e.target.closest() 识别被点击的子 <li> 并读取其 data-id。说明捕获 vs 冒泡的区别，以及 stopPropagation 和 preventDefault 的区别。',
  'frontend', 'easy',
  ARRAY['event-delegation','bubbling','capturing','closest','DOM'],
  $$// 事件委托利用冒泡，把子元素的事件监听统一放在父元素上，减少监听器数量。
// 适合动态列表、大量同类子元素的场景。

document.getElementById('list').addEventListener('click', e => {
    const target = e.target.closest('li')  // 向上找最近的 li（点击 span 也能匹配）
    if (!target) return
    console.log(target.dataset.id)
}, false)  // false = 冒泡触发，true = 捕获触发

// 捕获：window → document → html → body → ... → 目标元素
// 冒泡：目标元素 → ... → body → html → document → window
// e.stopPropagation() 阻止继续冒泡/捕获（不影响默认行为）
// e.preventDefault()  阻止默认行为，如 <a> 跳转（不影响冒泡）

// <ul id="list">
//   <li data-id="1"><span>Item 1</span></li>
//   <li data-id="2">Item 2</li>
// </ul>$$
);
