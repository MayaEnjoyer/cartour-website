// Client-only helpers (не викликаються на сервері)
export function initScrollAnimations() {
    const io = new IntersectionObserver((entries) => {
        for (const e of entries) {
            const el = e.target as HTMLElement
            if (e.isIntersecting) {
                const delay = Number(el.dataset.animateDelay || 0)
                if (delay) el.style.transitionDelay = `${delay}ms`
                const y = Number(el.dataset.animateY || 0)
                if (y) el.style.setProperty("--anim-y", `${y * 4}px`)
                el.classList.add("is-visible")

                // для letters усередині контейнера
                if (el.matches("[data-animate-letters]")) {
                    const chars = el.querySelectorAll<HTMLElement>(".char")
                    chars.forEach((c, i) => (c.style.transitionDelay = `${(delay || 0) + i * 30}ms`))
                }

                io.unobserve(el)
            }
        }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 })

    document.querySelectorAll<HTMLElement>("[data-animate], [data-animate-letters]").forEach((el) => {
        io.observe(el)
    })

    return () => io.disconnect()
}

export function splitLetters() {
    document.querySelectorAll<HTMLElement>("[data-split-chars]").forEach((node) => {
        if (node.querySelector(".char")) return
        const text = node.textContent ?? ""
        node.textContent = ""
        const frag = document.createDocumentFragment()
        for (const ch of text) {
            const span = document.createElement("span")
            span.className = "char"
            span.textContent = ch
            frag.appendChild(span)
        }
        node.appendChild(frag)
    })
}

export function initTilt(selector = ".tilt-media", strength = 12) {
    const cards = document.querySelectorAll<HTMLElement>(selector)
    cards.forEach((card) => {
        let raf = 0
        const bounds = () => card.getBoundingClientRect()
        function onMove(e: MouseEvent) {
            const b = bounds()
            const x = (e.clientX - b.left) / b.width - 0.5
            const y = (e.clientY - b.top) / b.height - 0.5
            cancelAnimationFrame(raf)
            raf = requestAnimationFrame(() => {
                card.style.transform = `rotateX(${(-y * strength).toFixed(2)}deg) rotateY(${(x * strength).toFixed(2)}deg)`
            })
        }
        function reset() {
            cancelAnimationFrame(raf)
            card.style.transform = ""
        }
        card.addEventListener("mousemove", onMove)
        card.addEventListener("mouseleave", reset)
    })

    return () => {
        cards.forEach((c) => c.replaceWith(c.cloneNode(true)))
    }
}

export function initParallaxBottom() {
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax-bottom]"))
    if (!items.length) return () => {}

    let ticking = false
    function update() {
        ticking = false
        const vh = window.innerHeight
        items.forEach((el) => {
            const factor = Number(el.dataset.parallaxBottom || el.getAttribute("data-parallax-bottom")) || -2.5
            const r = el.getBoundingClientRect()
            const p = Math.max(0, Math.min(1, 1 - r.top / vh))
            el.style.transform = `translate3d(0, ${p * factor * 10}px, 0)`
        })
    }
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(update)
            ticking = true
        }
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
        window.removeEventListener("scroll", onScroll)
        window.removeEventListener("resize", onScroll)
    }
}
