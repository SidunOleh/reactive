const effects = new Map
let runningEffect = null

function createEffect(fn) {
    const effect = () => {
        runningEffect = effect
        fn()
        runningEffect = null
    }

    effect()
}

function track(obj, prop) {
    if (!runningEffect) {
        return
    }

    if (objProps = effects.get(obj)) {
        if (propEffects = objProps.get(prop)) {
            propEffects.add(runningEffect)
        } else {
            const propEffects = (new Set)
                .add(runningEffect)
            objProps.set(prop, propEffects)
        }
    } else {
        const propEffects = (new Set)
            .add(runningEffect)
        const objProps = (new Map)
            .set(prop, propEffects)
        effects.set(obj, objProps)
    }
}

function trigger(obj, prop) {
    if (
        (objProps = effects.get(obj)) &&
        (propEffects = objProps.get(prop))
    ) {
        propEffects.forEach(effect => effect())
    }
}

function reactive(obj) {
    const isObject = val => {
        return (
            typeof val === 'object' &&
            val !== null
        )
    }

    for (const key in obj) {
        if (isObject(obj[key])) {
            obj[key] = reactive(obj[key])
        }
    }

    return new Proxy(obj, {
        get(target, prop) {
            track(target, prop)

            return target[prop]
        },
        set(target, prop, value) {
            target[prop] = value

            trigger(target, prop)

            return true
        },
    })
}
