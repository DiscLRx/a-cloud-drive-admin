// 只拷贝属性值，不可用于深拷贝
export default function (source) {
    const target = {}
    Object.assign(target, source)
    return target
}