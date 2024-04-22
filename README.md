# vanilla js reactivity

```javascript
const data = reactive({ count: 0 })

createEffect(() => {
    const countEl =
        document.getElementById('count')
    countEl.innerHTML = data.count
})

data.count++
```
